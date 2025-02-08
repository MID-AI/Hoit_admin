import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { MongoClient } from "mongodb";
import sharp from "sharp";

// Cloudflare R2 설정
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY || "",
    secretAccessKey: process.env.R2_SECRET_KEY || "",
  },
});

// MongoDB 설정
const mongoClient = new MongoClient(process.env.MONGO_URI!);
const db = mongoClient.db("imageDB");
const collection = db.collection("images");

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (files.length === 0)
    return NextResponse.json({ error: "파일을 선택하세요." }, { status: 400 });

  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        // 이미지 압축 및 WebP 변환
        const buffer = await file.arrayBuffer();
        const compressedBuffer = await sharp(Buffer.from(buffer))
          .resize(800) // 최대 너비 800px로 조정
          .webp({ quality: 80 }) // WebP 포맷으로 변환, 품질 80%
          .toBuffer();

        const fileKey = `images/${Date.now()}-${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}.webp`;

        // 파일 업로드
        const upload = new Upload({
          client: s3,
          params: {
            Bucket: process.env.R2_BUCKET!,
            Key: fileKey,
            Body: compressedBuffer,
            ContentType: "image/webp",
          },
        });

        await upload.done();

        // DB에 파일 정보 저장
        await collection.insertOne({
          imageKey: fileKey,
          uploadedAt: new Date(),
        });

        return fileKey;
      })
    );

    return NextResponse.json({ message: "파일 업로드 성공", uploadedFiles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}
