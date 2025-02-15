"use client";

import { deleteImageAction } from "@/actions/delete-image-action";
import { useActionState, useEffect, useRef } from "react";

export default function ImageDelete({ imgId }: { imgId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteImageAction,
    null
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
        <button
          onClick={() => formRef.current?.requestSubmit()}
          className="bg-red-500 border border-red-500 text-sm px-2 text-white whitespace-nowrap py-1 rounded"
        >
          삭제하기
        </button>
      )}
    </form>
  );
}
