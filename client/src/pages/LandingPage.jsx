import BrandSection from "../components/landing/BrandSection"
import AboutSection from "../components/landing/AboutSection"
import CTASection from "../components/landing/CTASection"

export default function LandingPage() {
  return (
    <div className="overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">

      <section className="snap-start min-h-screen flex items-center justify-center">
        <BrandSection />
      </section>

      <section className="snap-start min-h-screen flex items-center justify-center">
        <AboutSection />
      </section>

      <section className="snap-start min-h-screen flex items-center justify-center">
        <CTASection />
      </section>

    </div>
  )
}