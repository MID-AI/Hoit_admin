export interface APIResponse<T> {
  timestamp: string;
  statusCode: number;
  message: string;
  data: T;
}

export interface PageNation<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface Image {
  id: number;
  url: string;
  prompt: string;
  mainCategoryId: number;
  subCategoryId: number;
  hashtags: string[];
}

export const TagsMain = {
  일러스트: 1,
  애니: 2,
  실사: 3,
  자연: 4,
  판타지: 5,
  동물: 6,
  무채색: 7,
} as const;

export const TagsSub = {
  일러스트: {
    캐릭터여자: 8,
    캐릭터남자: 9,
    포스터: 10,
    빈티지: 11,
  },
  애니: {
    캐릭터: 12,
    배경화면: 13,
    고전: 14,
  },
  실사: {
    여자: 15,
    남자: 16,
    동물: 17,
    음식: 18,
    풍경: 19,
  },
  자연: {
    숲: 20,
    눈: 21,
  },
  동물: {
    실사: 25,
    강아지: 26,
    고양이: 27,
    드로잉: 28,
  },
  무채색: {
    배경화면: 29,
    캐릭터: 30,
    감성: 31,
    인테리어: 32,
  },
} as const;

export const TagsMainReverse = Object.fromEntries(
  Object.entries(TagsMain).map(([key, value]) => [value, key]),
) as Record<number, keyof typeof TagsMain>;

export const TagsSubReverse = Object.fromEntries(
  Object.values(TagsSub)
    .flatMap((category) => Object.entries(category)) // 모든 서브 카테고리를 평탄화
    .map(([key, value]) => [value, key]), // [id, "태그명"] 형태로 변환
) as Record<number, string>;
