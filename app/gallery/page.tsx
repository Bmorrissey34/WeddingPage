import { PageHeader } from "@/components/section-heading"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { galleryPhotos, wedding } from "@/lib/wedding-data"

export default function GalleryPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Engagement Gallery"
        title="Morgan & Brendan"
        description={`A collection of favorite engagement portraits as we count down to ${wedding.city}.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <GalleryLightbox photos={galleryPhotos} />
      </section>
    </main>
  )
}
