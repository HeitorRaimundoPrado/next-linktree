import prisma from "@/prisma/client"
export async function POST(req: Request) {
  const body = await req.json();
  try {
    await prisma.link.delete({
      where: {
        id: body.id
      }
    })
    return new Response(JSON.stringify({ msg: "link removed successfully" }), { status: 200 })
  } catch (e) {
    return new Response(e as string, { status: 500 })
  }
}
