export type PhotoItem = {
  src: string;
  place: string;
  date: string;
  caption: string;
  featured?: boolean;
};

export const photography: PhotoItem[] = [
  {
    src: "/images/lake round 2.jpeg",
    place: "Kurunegala, Sri Lanka",
    date: "April 2025",
    caption: "An evening made of reflections.",
    featured: true,
  },
  {
    src: "/images/snowy-paris.jpeg",
    place: "Paris, France",
    date: "January 2026",
    caption: "Quiet corners and paris filled with snow.",
  },
  {
    src: "/images/louvre.jpeg",
    place: "Paris, France",
    date: "March 2026",
    caption: "Chasing the blues in paris.",
  },
  {
    src: "/images/marseille.jpeg",
    place: "Marseille, France",
    date: "August 2026",
    caption: "Early morning glow.",
  },
  {
    src: "/images/calanque 2.jpg",
    place: "Marseille, France",
    date: "August 2026",
    caption: "A slice of paradise.",
  },
  {
    src: "/images/greece.jpg",
    place: "Mykonos, Greece",
    date: "September 2024",
    caption: "Postcard from the Cyclades.",
  },
  {
    src: "/images/paris 2.jpeg",
    place: "Paris, France",
    date: "July 2026",
    caption: "Capturing la vie en rose in 4k.",
  },
];
