import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ole Heinrichs - German Musician & Producer | Official Website",
  description: "Ole Heinrichs (O$ka) - German musician, music producer, and marketing professional. Official website with latest releases and professional services.",
  keywords: ["Ole Heinrichs", "Ole Oskar Heinrichs", "German musician", "music producer", "O$ka"],
  alternates: {
    canonical: "https://oleoskarheinrichs.com"
  }
};

export default function OleHeinrichsPage() {
  redirect('/');
}
