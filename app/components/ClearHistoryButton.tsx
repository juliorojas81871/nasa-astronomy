"use client";

import { useRouter } from "next/navigation";
import { clearViewedHistory } from "@/lib/history-actions";

export function ClearHistoryButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await clearViewedHistory();
        router.refresh();
      }}
      className="text-xs text-gray-500 hover:text-red-600 underline"
    >
      Clear history
    </button>
  );
}
