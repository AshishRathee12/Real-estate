// import cloudinary from "@/app/lib/cloudinary";
import cloudinary from "@/src/lib/cloudinary";
import { dbConnect } from "@/src/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("file") as File[];

    if (!files) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const results = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "my-app" }, (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      results.push(result);
    }
    console.log(results);
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
