"use server";

import { deleteImage } from "@/apis/admin";
import { revalidateTag } from "next/cache";

export async function deleteImageAction(_: unknown, formData: FormData) {
  const imgId = formData.get("imgId")?.toString();

  if (!imgId) {
    return {
      status: false,
      error: "삭제할 이미지가 없습니다",
    };
  }
  try {
    await deleteImage(imgId);
    revalidateTag(`imageList`);
  } catch (err) {
    return {
      status: false,
      error: `이미지 삭제 실패 ${err}`,
    };
  }
}
