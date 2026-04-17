"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const COOKIE_KEY = "nasa-gallery-history";
const dateListSchema = z.array(z.string());
const MAX_HISTORY = 9;

export async function getViewedDates(): Promise<Set<string>> {
  const store = await cookies();
  const raw = store.get(COOKIE_KEY)?.value;
  if (!raw) return new Set();

  try {
    const parsed = dateListSchema.parse(JSON.parse(raw));
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

export async function markAsViewed(date: string) {
  const store = await cookies();
  const history = await getViewedDates();
  history.add(date);
  const recentHistory = [...history]
    .sort()
    .slice(-MAX_HISTORY);

  store.set(COOKIE_KEY, JSON.stringify(recentHistory), {
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
}

export async function clearViewedHistory() {
  const store = await cookies();
  store.delete(COOKIE_KEY);
}