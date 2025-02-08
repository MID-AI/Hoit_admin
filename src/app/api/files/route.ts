import { NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Cloudflare R2 설정
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY || "",
    secretAccessKey: process.env.R2_SECRET_KEY || "",
  },
});

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET!,
    });
    const response = await s3.send(command);

    const files = await Promise.all(
      (response.Contents || []).map(async (file) => {
        const signedUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: process.env.R2_BUCKET!,
            Key: file.Key!,
          }),
          { expiresIn: 3600 }
        ); // 1시간 유효

        return {
          key: file.Key,
          url: signedUrl,
        };
      })
    );

    return NextResponse.json(files);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "파일 목록 조회 실패" }, { status: 500 });
  }
}
