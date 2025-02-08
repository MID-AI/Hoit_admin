"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface UploadedFile {
  key: string;
  url: string;
}

export default function Home() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/files");
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("파일 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadFiles || uploadFiles.length === 0)
      return alert("파일을 선택하세요.");

    setIsLoading(true);
    const formData = new FormData();
    Array.from(uploadFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("업로드 성공!");
      setUploadFiles(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("업로드 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (key: string) => {
    if (!confirm("정말로 이 이미지를 삭제하시겠습니까?")) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/delete?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("삭제 성공!");
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("삭제 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">파일 업로드</h1>
      <form onSubmit={uploadFile} className="mb-4">
        <input
          type="file"
          multiple
          onChange={(e) => setUploadFiles(e.target.files)}
          className="mb-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "처리 중..." : "업로드"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">업로드된 파일 목록</h2>
      <button
        onClick={fetchFiles}
        disabled={isLoading}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        {isLoading ? "로딩 중..." : "새로고침"}
      </button>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <li key={file.key} className="border p-4 rounded">
            <Image
              src={file.url || "/placeholder.svg"}
              alt={file.key}
              width={200}
              height={200}
              className="mb-2"
            />
            <div className="flex justify-between items-center">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                이미지 보기
              </a>
              <button
                onClick={() => deleteFile(file.key)}
                className="bg-red-500 text-white p-1 rounded"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
