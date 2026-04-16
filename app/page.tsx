import { getGalleryImages } from "@/lib/nasa-api";
import { getViewedDates } from "@/lib/history-actions";
import { GalleryCard } from "./components/GalleryCard";
import { ClearHistoryButton } from "./components/ClearHistoryButton";
import { cacheLife } from "next/cache";

export default async function Home() {
  const viewedSet = await getViewedDates();

  return (
    <HomeContent viewedDates={[...viewedSet]} hasHistory={viewedSet.size > 0} />
  );
}

async function HomeContent({ viewedDates, hasHistory }: { viewedDates: string[]; hasHistory: boolean }) {
  "use cache";
  cacheLife("days");

  const viewedSet = new Set(viewedDates);
  let gallery;

  try {
    gallery = await getGalleryImages();
  } catch {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Astronomy Gallery</h1>
        <p className="text-gray-500">
          NASA&apos;s API is rate-limited right now. Refresh the page in a minute or two.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Astronomy Gallery</h1>
        {hasHistory && <ClearHistoryButton />}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {gallery.map((item) => (
          <GalleryCard key={item.date} item={item} seen={viewedSet.has(item.date)} />
        ))}
      </div>
    </main>
  );
}
