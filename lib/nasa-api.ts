import { z } from "zod";

export const SpaceImageSchema = z.object({
  date: z.string(),
  title: z.string(),
  explanation: z.string(),
  url: z.string(),
  hdurl: z.string().optional(),
  media_type: z.enum(["image", "video"]),
  copyright: z.string().optional(),
});

export type SpaceImage = z.infer<typeof SpaceImageSchema>;

const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const images = new Map<string, SpaceImage>();

export async function getGalleryImages(): Promise<SpaceImage[]> {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 14);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${fmt(start)}&end_date=${fmt(today)}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    console.error("Error fetching NASA image by date", res, await res.text());
    throw new Error(`NASA Gallery fetch failed: ${res.status}`);
  }
  const raw: unknown[] = await res.json();
  const items = z.array(SpaceImageSchema).parse(raw);
  const filtered = items
    .filter((item) => item.media_type === "image" && item.url)
    .reverse()
    .slice(0, 9);

  for (const item of filtered) {
    images.set(item.date, item);
  }
  return filtered;
}

export async function getImageByDate(date: string): Promise<SpaceImage> {
  const cached = images.get(date);
  if (cached) return cached;

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error("Error fetching NASA image by date", res, await res.text());
    throw new Error(`NASA fetch failed for ${date}`);
  }

  return SpaceImageSchema.parse(await res.json());
}
