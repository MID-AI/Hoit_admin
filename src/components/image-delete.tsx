"use client";

import { deleteImageAction } from "@/actions/delete-image-action";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function ImageDelete({ imgId }: { imgId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteImageAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="imgId" value={imgId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <Button
          variant="destructive"
          onClick={() => formRef.current?.requestSubmit()}
        >
          <Trash2 />
        </Button>
      )}
    </form>
  );
}
