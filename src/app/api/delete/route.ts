import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { MongoClient } from "mongodb";

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

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { error: "삭제할 이미지 키가 제공되지 않았습니다." },
      { status: 400 }
    );
  }

  try {
    // R2에서 파일 삭제
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
      })
    );

    // MongoDB에서 파일 정보 삭제
    await collection.deleteOne({ imageKey: key });

    return NextResponse.json({
      message: "이미지가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("이미지 삭제 중 오류 발생:", error);
    return NextResponse.json({ error: "이미지 삭제 실패" }, { status: 500 });
  }
}
