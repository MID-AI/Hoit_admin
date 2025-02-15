export interface APIResponse<T> {
  timestamp: string;
  statusCode: number;
  message: string;
  data: T[];
}

export interface Image {
  id: number;
  url: string;
  prompt: string;
  mainCategoryId: number;
  subCategoryId: number;
}

export const TagsMain = {
  일러스트: 1,
  애니: 2,
  실사: 3,
  자연: 4,
  판타지: 5,
  회화: 6,
  동물: 7,
  무채색: 8,
  캐릭터: 9,
} as const;

export const TagsSub = {
  일러스트: 10,
  t: 11,
  애니: 12,
  실사: 13,
  자연: 14,
  판타지: 15,
  회화: 16,
  동물: 17,
  무채색: 18,
  캐릭터: 19,
} as const;
