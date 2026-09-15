import { PhotographyGallery } from '../components/PhotographyGallery'
import { photography } from '../data/photography'

export function Photography() {
  return (
    <section id="photography" className="px-4 py-4 md:px-8 md:py-5">
      <div className="mb-4 border-b border-ink pb-3">
        <h2 className="font-display text-[2.5rem] leading-none tracking-[-0.06em] text-ink md:text-[4rem]">THROUGH MY LENS</h2>
      </div>

      <PhotographyGallery photos={photography} />
    </section>
  )
}
