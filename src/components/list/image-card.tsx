"use client";

import ImageDelete from "../image-delete";
import Image from "next/image";
import { Image as ImageProps } from "@/@types";
import { Button } from "../ui/button";
import { LetterText, ScanSearch } from "lucide-react";
import { useSetAtom } from "jotai";
import { hashTagsAtom, promptAtom } from "@/store/image-atom";

export default function ImageCard({ img }: { img: ImageProps }) {
  const setPrompt = useSetAtom(promptAtom);
  const setHashTags = useSetAtom(hashTagsAtom);

  const handleClick = () => {
    setPrompt(img.prompt);
    setHashTags(img.hashtags);
  };

  return (
    <li className="group relative h-48 w-48 overflow-hidden rounded-md border">
      <Image
        src={img.url}
        alt={img.prompt}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button onClick={handleClick}>
          <LetterText />
        </Button>
        <Button variant="outline">
          <a href={img.url} target="_blank" rel="noopener noreferrer">
            <ScanSearch />
          </a>
        </Button>

        <ImageDelete imgId={img.id} />
      </div>
    </li>
  );
}
