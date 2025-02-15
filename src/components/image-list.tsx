import { getImageList } from "@/apis/admin";
import Image from "next/image";
import ImageDelete from "./image-delete";

export default async function ImageList() {
  const images = await getImageList();
  return (
    <section className="rounded-xl p-6 flex flex-col border mt-4 border-gray-200 text-gray-900">
      <h1 className="text-xl font-bold mb-2">이미지 목록</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.data.map((img) => (
          <li key={img.id}>
            <div className="max-h-48 overflow-hidden relative group">
              <Image
                src={img.url}
                alt={img.prompt}
                width={400}
                height={400}
                className="object-cover"
              />
              <div className="flex gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 border whitespace-nowrap border-blue-500 text-sm px-2 py-1 rounded"
                >
                  원본 보기
                </a>
                <ImageDelete imgId={img.id} />
              </div>
            </div>

            <p>{img.prompt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
