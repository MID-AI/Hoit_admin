"use client";

import UploadImageAction from "@/actions/upload-image-action";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import TagsList from "./upload/tags-list";
import Buttons from "./upload/buttons";
import HashTag from "./upload/hash-tag";
import { FileInput } from "./upload/file-input";
import { useAtom } from "jotai";
import {
  hashTagsAtom,
  promptAtom,
  selectedTagAtom,
  subTagAtom,
} from "@/store/image-atom";

export default function ImageUpload() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [subTag, setSubTag] = useAtom(subTagAtom);
  const [hashTags, setHashTags] = useAtom(hashTagsAtom);

  const formRef = useRef<HTMLFormElement>(null);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);

  const [inputValue, setInputValue] = useState<string>("");

  const [state, formAction, isPending] = useActionState(
    UploadImageAction,
    null,
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

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    setSubTag("");
  };

  const handleSubTagChange = (value: string) => {
    setSubTag(value);
  };

  const handleReset = () => {
    setUploadFiles(null);
    setSelectedTag("");
    setSubTag("");
    setPrompt("");
    setHashTags([]);
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
    if (!prompt) {
      alert("프롬프트를 입력해주세요.");
      return;
    }

    const formData = new FormData();

    const file = uploadFiles[0];
    formData.append("file", file);

    const metadata = {
      prompt: prompt,
      hashtags: hashTags,
      mainCategoryId: parseInt(selectedTag),
      ...(subTag && { subCategoryId: parseInt(subTag) }),
    };
    formData.append("metadata", JSON.stringify(metadata));
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <section className="flex h-fit max-w-80 flex-col gap-3 rounded-xl border border-gray-200 p-6 text-gray-900">
      <h1 className="mb-2 text-lg font-bold">파일 업로드</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col justify-between"
      >
        <div className="flex flex-col gap-6">
          <FileInput handleFileChange={(e) => handleFileChange(e)} />
          <TagsList
            selectedTag={selectedTag}
            handleTagChange={handleTagChange}
            subTag={subTag}
            handleSubTagChange={handleSubTagChange}
          />
          <div>
            <h3 className="mb-1 text-sm">프롬프트</h3>
            <textarea
              name="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="프롬프트를 입력해주세요"
              className="h-20 w-full resize-none rounded-md border border-gray-300 p-2 text-sm"
            />
          </div>
          <HashTag
            hashTags={hashTags}
            setHashTags={setHashTags}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        <Buttons handleReset={handleReset} isPending={isPending} />
      </form>
    </section>
  );
}
