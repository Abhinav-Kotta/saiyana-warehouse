import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import Partners from '@/components/sections/Partners';
import Contact from '@/components/sections/Contact';

// Add your partner logos data
const partnerLogos = [
  {
    src: "/images/partners/Adyar_Ananda_Bhavan_logo.png",
    alt: "Partner Company 1"
  },
  {
    src: "/images/partners/amway-logo.png",
    alt: "Partner Company 2"
  },
  {
    src: "/images/partners/ana-logo.png",
    alt: "Partner Company 3"
  },
  {
    src: "/images/partners/Phillips-Logo.png",
    alt: "Partner Company 4"
  },
  {
    src: "/images/partners/rorito-logo.jpg",
    alt: "Partner Company 5"
  },
  {
    src: "/images/partners/srichakra-logo.png",
    alt: "Partner Company 6"
  },
  {
    src: "/images/partners/Wohlhaupter_Logo.png",
    alt: "Partner Company 7"
  },
  {
    src: "/images/partners/ZydusWellness_logo.png",
    alt: "Partner Company 8"
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Stats />
      <Partners logos={partnerLogos} />
      <Contact />
    </>
  );
}