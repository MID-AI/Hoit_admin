import { APIResponse, Image } from "@/@types";
import { API_ROUTES } from "./routes";

export const getImageList = async (): Promise<APIResponse<Image>> => {
  const res = await fetch(API_ROUTES.IMAGE, {
    next: { tags: ["imageList"] },
  });
  if (!res.ok) {
    throw new Error("이미지 리스트를 불러오는데 실패했습니다.");
  }
  return await res.json();
};

export const deleteImage = async (imgId: string) => {
  const res = await fetch(`${API_ROUTES.IMAGE}/${imgId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
};

export const uploadImage = async (formData: FormData) => {
  const res = await fetch(API_ROUTES.IMAGE, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
};
