import { motion } from "framer-motion";
import type { PhotoItem } from "../data/photography";

type PhotographyGalleryProps = {
  photos: PhotoItem[];
};

export function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const featured = photos.find((photo) => photo.featured) ?? photos[0];
  const gridPhotos = photos.filter((photo) => photo !== featured);

  return (
    <div className="space-y-6">
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden border border-ink bg-paper"
      >
        <img
          src={featured.src}
          alt={`${featured.place} ${featured.date}`}
          className="h-[340px] w-full object-cover md:h-[520px]"
        />
        <figcaption className="flex flex-col gap-1 border-t border-ink px-3 py-3 text-left md:flex-row md:items-end md:justify-between md:px-4 md:py-4">
          <div className="text-[0.66rem] font-sans uppercase tracking-[0.18rem] text-muted">
            {featured.place} - {featured.date}
          </div>
          <div className="max-w-md text-[0.9rem] italic text-ink">
            {featured.caption}
          </div>
        </figcaption>
      </motion.figure>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {gridPhotos.map((photo, index) => (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="overflow-hidden border border-ink bg-paper"
          >
            <img
              src={photo.src}
              alt={`${photo.place} ${photo.date}`}
              className="h-[260px] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <figcaption className="border-t border-ink px-3 py-3 text-left">
              <div className="text-[0.62rem] font-sans uppercase tracking-[0.18rem] text-muted">
                {photo.place} - {photo.date}
              </div>
              <div className="mt-2 text-[0.9rem] italic text-ink">
                {photo.caption}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
