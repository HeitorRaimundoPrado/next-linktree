import { verifyTokenMiddleware } from "@/app/middleware/verifyToken"
import Link from "@/models/Link";
import prisma from "@/prisma/client";

export const POST = async (req: Request) => {
  const userId = verifyTokenMiddleware(req);
  const body = await req.json();

  if (userId === null || userId === undefined) {
    return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 })
  }
  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      links: true
    }
  })

  if (user === null || user === undefined) {
    return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 })
  }

  const newLink = await prisma.link.create({
    data: {
      url: body.url,
      description: body.desc,
      authorId: userId,
    }
  })

  return new Response(JSON.stringify({ msg: "successful creation of link", newLink }), { status: 200 });
}
