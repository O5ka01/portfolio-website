import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "murphywav - O$ka's Music Production | Official Website",
  description: "murphywav - Music production alias of O$ka (Ole Heinrichs). German musician, music producer, and marketing professional.",
  keywords: ["murphywav", "O$ka", "Ole Heinrichs", "music production", "German producer"],
  alternates: {
    canonical: "https://oleoskarheinrichs.com"
  }
};

export default function MurphywavPage() {
  redirect('/');
}
