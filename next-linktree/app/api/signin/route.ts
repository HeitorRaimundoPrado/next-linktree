import prisma from "../../../prisma/client";
import { redirect } from "next/dist/server/api-utils";
const { createHash } = require("node:crypto")
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        username: username as string
      }
    });

    if (user === undefined || user === null) {
      return new Response(JSON.stringify({ msg: "no user with that username was found" }), { status: 404 });
    }

    const passwordHash = createHash("sha256").update(password).digest("hex");
    if (passwordHash == user.passwordHash) {
      const cookieStore = cookies();
      cookieStore.set("userId", String(user.id), { secure: true });;
      return new Response(JSON.stringify({ msg: "successful login" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ msg: "incorrect password" }), { status: 401 });
    }
  } catch (e) {
    return new Response(e as string, { status: 500 })
  }
}
