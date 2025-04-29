"use client";

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faInstagram, 
  faTiktok, 
  faYoutube, 
  faSpotify, 
  faSoundcloud 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

type SocialIconsProps = {
  size?: "sm" | "lg";
};

const SocialIcons: FC<SocialIconsProps> = ({ size = "lg" }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <a 
        href="https://www.linkedin.com/in/ole-oskar-heinrichs/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="LinkedIn profile"
      >
        <FontAwesomeIcon icon={faLinkedin} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://www.instagram.com/oska.hayati/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="Instagram profile"
      >
        <FontAwesomeIcon icon={faInstagram} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://www.tiktok.com/@oska.hayati" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="TikTok profile"
      >
        <FontAwesomeIcon icon={faTiktok} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://www.youtube.com/@oska.hayati" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="YouTube channel"
      >
        <FontAwesomeIcon icon={faYoutube} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="Spotify profile"
      >
        <FontAwesomeIcon icon={faSpotify} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://soundcloud.com/murphywav" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="SoundCloud profile"
      >
        <FontAwesomeIcon icon={faSoundcloud} className="text-dark-text" size={size} />
      </a>
    </div>
  );
};

export const EmailLink: FC = () => {
  return (
    <a 
      href="mailto:ooh.oska@outlook.de" 
      className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors"
      aria-label="Email Ole Oskar Heinrichs"
    >
      <div className="bg-accent-secondary/40 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
        <FontAwesomeIcon icon={faEnvelope} className="text-dark-text" />
      </div>
      <span>ooh.oska@outlook.de</span>
    </a>
  );
};

export default SocialIcons;
