"use client";

import { TagsMain } from "@/@types";
import UploadImageAction from "@/actions/upload-image-action";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

export default function ImageUpload() {
  const formRef = useRef<HTMLFormElement>(null);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | "">("");
  const [subTag, setSubTag] = useState<string | "">("");

  const [state, formAction, isPending] = useActionState(
    UploadImageAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(e.target.files);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  const handleSubTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubTag(e.target.value);
  };

  const handleReset = () => {
    setUploadFiles(null);
    setSelectedTag("");
    setSubTag("");
    formRef.current?.reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadFiles) {
      alert("파일을 선택해주세요.");
      return;
    }
    if (!selectedTag) {
      alert("태그를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    Array.from(uploadFiles).forEach((file) => {
      formData.append("file", file);
    });

    formData.append("tag", selectedTag);
    if (subTag) formData.append("subTag", subTag);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <section className="rounded-xl p-6 flex flex-col border border-gray-200 text-gray-900 max-w-fit">
      <h1 className="text-lg font-bold mb-2">파일 업로드</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col justify-between"
      >
        <div className="mb-4 flex gap-1 flex-wrap">
          <input type="file" name="file" onChange={handleFileChange} />

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 items-start">
              <h3 className="font-semibold">메인 태그</h3>
              <select
                value={selectedTag}
                onChange={handleTagChange}
                className="flex flex-wrap gap-2 items-center border border-zinc-900 px-3 py-1 rounded"
              >
                <option value="" disabled>
                  태그를 선택하세요
                </option>
                {Object.keys(TagsMain).map((tag) => (
                  <option
                    key={tag}
                    value={TagsMain[tag as keyof typeof TagsMain]}
                  >
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <h3 className="font-semibold">서브 태그</h3>
              <select
                value={subTag}
                onChange={handleSubTagChange}
                className="flex flex-wrap gap-2 items-center border border-zinc-900 px-3 py-1 rounded"
              >
                <option value="" disabled>
                  태그를 선택하세요
                </option>
                {Object.keys(TagsMain).map((tag) => (
                  <option
                    key={tag}
                    value={TagsMain[tag as keyof typeof TagsMain]}
                  >
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="p-2 rounded-lg w-full border border-black"
          >
            {isPending ? "..." : "초기화"}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="text-white p-2 rounded-lg border border-zinc-900 bg-zinc-900 w-full"
          >
            {isPending ? "..." : "업로드"}
          </button>
        </div>
      </form>
    </section>
  );
}
