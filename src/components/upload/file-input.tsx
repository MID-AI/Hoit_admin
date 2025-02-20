import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export function FileInput({
  handleFileChange,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">이미지</Label>
      <Input id="picture" type="file" onChange={handleFileChange} />
    </div>
  );
}
