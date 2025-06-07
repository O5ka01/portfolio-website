import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "O$ka - German Musician & Producer | Official Website",
  description: "O$ka (Ole Heinrichs) - German musician, music producer, and marketing professional. Official website with latest releases and professional services.",
  keywords: ["O$ka", "Oska musician", "German musician", "music producer", "Ole Heinrichs"],
  alternates: {
    canonical: "https://oleoskarheinrichs.com"
  }
};

export default function OskaPage() {
  redirect('/');
}
