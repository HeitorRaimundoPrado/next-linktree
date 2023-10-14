import prisma from '../../../prisma/client'
const { createHash } = require("node:crypto")

export async function POST(req: Request) {
  let body = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.email as string },
          { username: body.username as string }
        ]

      }
    });

    if (user !== null && user != undefined) {
      return new Response(JSON.stringify({ "msg": "username or email already taken" }), { status: 409 });
    }

    const passwordHash = createHash("sha256").update(body.password).digest("hex")
    const newUser = await prisma.user.create({
      data: {
        username: body.username as string,
        passwordHash,
        email: body.email as string
      }
    })

    return new Response(JSON.stringify({ "msg": "user created succesfully" }), { status: 200 });

  }
  catch (e) {
    return new Response(e as string, { status: 500 })
  }
}
