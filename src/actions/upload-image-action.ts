"use server";

import { uploadImage } from "@/apis/admin";
import { revalidateTag } from "next/cache";

export default async function UploadImageAction(
  _: unknown,
  formData: FormData,
) {
  console.log(formData);
  try {
    await uploadImage(formData);
    revalidateTag("imageList");
  } catch (err) {
    return {
      status: false,
      error: `이미지 저장에 실패했습니다 : ${err}`,
    };
  }
}
