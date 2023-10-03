import prisma from "../../../prisma/client";
const { createHash } = require("node:crypto")
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
import { NextApiResponse } from "next";

const generateToken = (userId: number) => {
  console.log(process.env)
  const token = jwt.sign({ userId }, process.env.SECRET_KEY_NEXT, { expiresIn: '1h' });
  return token;
};


const setTokenCookie = (res: Response, token: string) => {
  res.headers.set(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour in seconds
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Only set 'secure' in production
      path: '/',
    })
  );
};

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
      const res = new Response(JSON.stringify({ msg: "successful login" }), { status: 200 });
      setTokenCookie(res, generateToken(user.id));
      return res;
    } else {
      return new Response(JSON.stringify({ msg: "incorrect password" }), { status: 401 });
    }
  } catch (e) {
    return new Response(e as string, { status: 500 })
  }
}
