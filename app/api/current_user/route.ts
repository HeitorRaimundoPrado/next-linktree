import { verifyTokenMiddleware } from "@/app/middleware/verifyToken";
import prisma from "@/prisma/client";
const jwt = require('jsonwebtoken')

export async function GET(req: Request) {
  const userId = verifyTokenMiddleware(req);
  if (userId === null) {
    return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        links: true
      }
    })

    if (user === null || user === undefined) {
      return new Response(JSON.stringify({ msg: "Error retrieving user from database" }), { status: 404 });
    }
    const userWithoutPassword =
      Object.fromEntries(Object.entries(user).filter((key) => !key.includes("passwordHash")))
    return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 200 })
  } catch (e) {
    return new Response(e as string, { status: 500 })
  }
}
