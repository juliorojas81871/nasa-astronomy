import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { SpaceImage } from "@/lib/nasa-api";

export function GalleryCard({ item, seen }: { item: SpaceImage; seen: boolean }) {
  return (
    <Link
      href={`/photo/${item.date}`}
      className={twMerge(
        "block border border-gray-200 rounded-lg overflow-hidden hover:border-gray-500",
        seen ? "bg-emerald-50" : "bg-white"
      )}
    >
      <Image
        src={item.url}
        alt={item.title}
        width={400}
        height={300}
        className="w-full aspect-4/3 object-cover"
        loading="eager"
      />
      <div className="p-3">
        <h2 className="font-semibold text-sm leading-tight">{item.title}</h2>
        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
      </div>
    </Link>
  );
}