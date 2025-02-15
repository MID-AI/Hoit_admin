import ImageList from "@/components/image-list";
import ImageUpload from "@/components/image-upload";

export default function Home() {
  return (
    <div className="container mx-auto flex px-1.5 py-4 flex-col gap-6">
      <h1 className="text-lg font-bold">HOIT ADMIN</h1>
      <main>
        <ImageUpload />
        <ImageList />
      </main>
    </div>
  );
}
