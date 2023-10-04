import { verifyTokenMiddleware } from "@/app/middleware/verifyToken";
import prisma from "@/prisma/client";

export const POST = async (req: Request) => {
  const userId = verifyTokenMiddleware(req);
  if (userId === null) {
    return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 })
  }

  const { newDesc } = await req.json();
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        desc: newDesc
      }
    })
    return new Response(JSON.stringify({ msg: "description updated successfully" }), { status: 200 })

  } catch (e) {
    return new Response(e as string, { status: 500 });
  }
}
