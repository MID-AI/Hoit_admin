"use client";

import { Input } from "../ui/input";

interface Props {
  hashTags: string[];
  setHashTags: React.Dispatch<React.SetStateAction<string[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function HashTag({
  hashTags,
  setHashTags,
  inputValue,
  setInputValue,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!hashTags.includes(inputValue.trim())) {
        setHashTags([...hashTags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setHashTags(hashTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <h3 className="mb-1 text-sm">해시태그</h3>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="해시태그 입력 후 Enter"
        className="mb-2"
      />
      <ul className="mb-2 flex flex-wrap gap-1">
        {hashTags.map((tag, idx) => (
          <li
            key={idx}
            className="flex w-fit items-center rounded-xl border bg-gray-100 px-1 py-0.5 text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-sm"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
