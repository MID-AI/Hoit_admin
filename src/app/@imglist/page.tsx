import { getImageList } from "@/apis/admin";
import ImageCard from "@/components/list/image-card";
import ListPage from "@/components/list/list-page";

export default async function ImageList({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const result = await getImageList(page ? Number(page) : 0);
  const images = result.data.content;
  return (
    <section className="flex max-h-[750px] w-full flex-col gap-4 rounded-xl border border-gray-200 p-6 text-gray-900">
      <div className="flex justify-between">
        <h1 className="w-full text-xl font-bold">이미지 목록</h1>
        <ListPage
          totalPages={result.data.totalPages}
          page={page ? Number(page) : 1}
        />
      </div>

      <ul className="flex flex-wrap gap-2 overflow-y-auto">
        {images?.map((img) => <ImageCard key={img.id} img={img} />)}
      </ul>
    </section>
  );
}
