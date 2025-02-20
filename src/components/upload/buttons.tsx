import { Button } from "../ui/button";

interface Props {
  handleReset: () => void;
  isPending: boolean;
}

export default function Buttons({ handleReset, isPending }: Props) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        onClick={handleReset}
        disabled={isPending}
        variant="outline"
        className="w-full"
      >
        {isPending ? "..." : "초기화"}
      </Button>
      <Button type="submit" disabled={isPending} className="w-full border-none">
        {isPending ? "..." : "업로드"}
      </Button>
    </div>
  );
}
