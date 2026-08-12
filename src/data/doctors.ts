// Single source of truth for the doctor roster.
// Used by the homepage team section and /doctors — edit here, not in the pages.
import type { ImageMetadata } from "astro";
import docYelena from "../assets/team/yelena-mikhaylova.jpg";
import docAlla from "../assets/team/alla-hart.webp";
import docAbanob from "../assets/team/abanob-saleh.jpg";

export interface Doctor {
  name: string;
  credentials: string;
  title: string;
  bio: string;
  img: ImageMetadata;
  slug: string;
}

export const DOCTORS: Doctor[] = [
  {
    name: "Dr. Yelena Mikhaylova",
    credentials: "DDS",
    title: "Founder & Clinical Director",
    bio: "With over a decade of experience, Dr. Mikhaylova combines clinical precision with an artistic eye to create healthy, confident smiles.",
    img: docYelena,
    slug: "yelena-mikhaylova",
  },
  {
    name: "Dr. Alla Hart",
    credentials: "DDS",
    title: "General & Cosmetic Dentist",
    bio: "A graduate of NYU College of Dentistry with a GPR from Columbia University, Dr. Hart brings 30+ years of expertise in cosmetic veneers, implant restorations, Invisalign®, and full-mouth rehabilitation.",
    img: docAlla,
    slug: "alla-hart",
  },
  {
    name: "Dr. Abanob Saleh",
    credentials: "DMD",
    title: "General & Restorative Dentist",
    bio: "A Queens native and NYU School of Dentistry graduate, Dr. Saleh completed his residency at the Northport VA Medical Center and takes a comprehensive, holistic approach to every patient.",
    img: docAbanob,
    slug: "abanob-saleh",
  },
];
