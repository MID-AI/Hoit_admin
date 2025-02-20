import { TagsMain, TagsSub } from "@/@types";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  selectedTag: string;
  handleTagChange: (value: string) => void;
  subTag: string;
  handleSubTagChange: (value: string) => void;
}

export default function TagsList({
  selectedTag,
  handleTagChange,
  subTag,
  handleSubTagChange,
}: Props) {
  return (
    <>
      {/* 메인 태그 선택 */}
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="tag">메인 태그</Label>
        <Select onValueChange={handleTagChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(TagsMain).map((tag) => (
                <SelectItem
                  key={tag}
                  value={TagsMain[tag as keyof typeof TagsMain].toString()}
                >
                  {tag}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* 서브 태그 선택 */}
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="tag">서브 태그</Label>
        <Select value={subTag} onValueChange={handleSubTagChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="서브 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!selectedTag && (
                <div className="px-2 py-1 text-sm">
                  메인 태그를 먼저 선택하세요
                </div>
              )}
              {selectedTag &&
                Object.entries(TagsSub).map(([mainTag, subTags]) => {
                  if (
                    TagsMain[mainTag as keyof typeof TagsMain] ===
                    Number(selectedTag)
                  ) {
                    return Object.entries(subTags).map(
                      ([subTagName, subTagId]) => (
                        <SelectItem key={subTagId} value={subTagId.toString()}>
                          {subTagName}
                        </SelectItem>
                      ),
                    );
                  }
                  return null;
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
