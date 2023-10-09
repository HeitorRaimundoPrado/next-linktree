import fs from 'fs'
import path from 'path';
import { writeFile } from 'fs/promises'
import { verifyTokenMiddleware } from '@/app/middleware/verifyToken';
import prisma from "@/prisma/client"


export async function POST(req: Request) {
  try {
    const userId = verifyTokenMiddleware(req);

    if (userId === null || userId === undefined) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 })
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    if (user === null || user === undefined) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 })
    }


    const formData = await req.formData();
    const img = formData.get("file") as File;
    if (img === null || img === undefined) {
      return new Response(JSON.stringify({ msg: "no files were uploaded" }), { status: 400 })
    }

    if (!fs.existsSync("./public/uploads")) {
      fs.mkdirSync("./public/uploads");
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    const filePath = user.username + Date.now();
    await writeFile(path.join(process.cwd(), "public/uploads/" + filePath), buffer)

    if (user.photo) {
      fs.unlink(user.photo, (err) => {
        if (err) {
          console.error("Error: ", err)
        }
      })
    }

    const newUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        photo: filePath,
      }
    })

    return new Response(JSON.stringify({ msg: "file uploaded sucessfully", user: newUser }), { status: 200 })

  }

  catch (e) {
    return new Response(e as string, { status: 500 })
  }
}
