import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

type LocalizedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  prefetch?: boolean;
  onClick?: () => void;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
};

/**
 * A component that wraps Next.js Link and adds language information to internal links
 * External links work as expected without modification
 */
export default function LocalizedLink({
  href,
  children,
  className = '',
  ariaLabel,
  prefetch = false,
  onClick,
  target,
  rel,
  ...props
}: LocalizedLinkProps) {
  const { language } = useLanguage();
  
  // Check if the link is external or internal
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  // For external links, use regular anchor tags
  if (isExternal) {
    return (
      <a 
        href={href}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // For internal links, add language information
  const localizedHref = language !== 'de' ? `/${language}${href}` : href;
  
  return (
    <Link 
      href={localizedHref}
      className={`${className} focus-ring`}
      aria-label={ariaLabel}
      prefetch={prefetch}
      onClick={onClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}
