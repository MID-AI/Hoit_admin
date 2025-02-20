import ImageUpload from "@/components/image-upload";

export default function Home() {
  return (
    <main className="min-w-80">
      <ImageUpload />
      <div className="text-sm text-gray-500">
        ❗ 버그 제보는 #지수 카톡or디코 주세요
      </div>
      <div className="text-sm text-gray-500">
        ❗ 이미지가 클수록 렌더링 속도 오래걸려요
      </div>
    </main>
  );
}
