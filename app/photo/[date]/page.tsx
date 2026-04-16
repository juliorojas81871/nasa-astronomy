import { getImageByDate, SpaceImage } from "@/lib/nasa-api";
import { ViewTracker } from "@/app/components/ViewTracker";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { z } from "zod";
import { notFound } from "next/navigation";

const dateParam = z.iso.date();

export default async function PhotoPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const parsed = dateParam.safeParse(date);
  if (!parsed.success) notFound();
  let photo: SpaceImage | undefined;
  try {
    photo = await getImageByDate(date);
  } catch {
    throw new Error("Failed to fetch photo")
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Suspense>
        <ViewTracker date={date} />
      </Suspense>
      <Link
        href="/"
        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-6 inline-flex items-center gap-1"
      >
        Back to gallery
      </Link>
      <article className="mt-4">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {photo.title}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Date: {photo.date} {photo.copyright && `| Image Credit & Copyright: ${photo.copyright}`}
          </p>
        </header>
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-200">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain"
          />
        </div>
        <section className="mt-10 border-t border-gray-100 pt-8">
          <p className="text-lg leading-relaxed text-gray-700">
            {photo.explanation}
          </p>
        </section>
      </article>
    </main>
  );
}