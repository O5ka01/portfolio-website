"use client";

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faInstagram, 
  faTiktok, 
  faYoutube, 
  faSpotify, 
  faSoundcloud, 
  faGithub,
  faBandcamp
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Custom Substack icon component
const SubstackIcon: FC<{ size?: "sm" | "lg" }> = ({ size = 'sm' }) => {
  // Set icon size based on the size prop
  const iconSize = size === 'lg' ? 18 : 14;
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className="text-dark-text"
    >
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
};

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
        href="https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY?si=FBpspC__S7-hAWI5Omf3gQ" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="Spotify profile"
      >
        <FontAwesomeIcon icon={faSpotify} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://on.soundcloud.com/yc2BjCAlBb9tYhwGk5" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="SoundCloud profile"
      >
        <FontAwesomeIcon icon={faSoundcloud} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://github.com/O5ka01" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="GitHub profile"
      >
        <FontAwesomeIcon icon={faGithub} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://oskamusic.bandcamp.com/track/wegen-mir" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="Bandcamp profile"
      >
        <FontAwesomeIcon icon={faBandcamp} className="text-dark-text" size={size} />
      </a>
      <a 
        href="https://substack.com/@oskahayati" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent-secondary/40 hover:bg-accent-secondary/70 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        aria-label="Substack newsletter"
      >
        <SubstackIcon size={size} />
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
