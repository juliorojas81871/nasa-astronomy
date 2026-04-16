"use client";

import { useEffect } from "react";
import { markAsViewed } from "@/lib/history-actions";

export function ViewTracker({ date }: { date: string }) {
  useEffect(() => {
    markAsViewed(date);
  }, [date]);

  return null;
}
