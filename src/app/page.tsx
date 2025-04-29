"use client";

import { useState, useRef, useEffect } from 'react';
import SocialIcons, { EmailLink } from '@/components/SocialIcons';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';

// Helper function to safely render HTML content
const RenderHTML = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function Home() {
  // Use useEffect to ensure this code only runs on the client
  const [isMounted, setIsMounted] = useState(false);
  const [enlargedVideo, setEnlargedVideo] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Fix hydration mismatch by only rendering client-specific content after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = (videoSrc: string) => {
    setEnlargedVideo(videoSrc);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    setTimeout(() => setIsAnimating(true), 50); // Start animation after a short delay
  };

  const closeModal = () => {
    setIsAnimating(false); // Start closing animation
    setTimeout(() => {
      setEnlargedVideo(null);
      document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300); // Match this with the transition duration
  };

  // Handle click outside the video container to close modal
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (!isMounted) {
    // Return a skeleton or simplified version for server rendering
    return <div className="bg-warm-beige min-h-screen"></div>;
  }

  return (
    <div className="bg-warm-beige min-h-screen">
      {/* Video Modal with smooth transition */}
      {enlargedVideo && (
        <div 
          className={`fixed inset-0 bg-black/0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${isAnimating ? 'bg-black/80' : ''}`}
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-label="Video modal"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
        >
          <div 
            ref={modalRef}
            className={`relative w-full max-w-4xl transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
              <video 
                className="w-full h-full object-contain" 
                src={enlargedVideo}
                autoPlay 
                loop 
                muted 
                playsInline
                aria-label="Video content"
              />
            </div>
            {/* Close button for better usability on mobile */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Navigation - Using the new Responsive Navbar */}
      <header>
        <ResponsiveNavbar />
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row gap-8 md:gap-10 items-center mb-12 md:mb-20">
          <div className="w-full md:w-1/2 space-y-3 md:space-y-4 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-text">{t('header.title')}</h1>
            <p className="text-lg sm:text-xl text-accent-tertiary">{t('header.subtitle')}</p>
            <h2 className="text-xl sm:text-2xl font-medium text-dark-text">{t('header.profession')}</h2>
            <p className="text-base sm:text-lg text-dark-text/80 leading-relaxed">
              {t('header.description')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center py-4">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-accent-primary shadow-lg relative">
              <Image 
                src="https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg" 
                alt="Ole Oskar Heinrichs (O$ka) - Musician and Marketing Professional"
                fill
                sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 16rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-12 md:mb-20 scroll-mt-20" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('projects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Project 1 */}
            <article className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01]">
              <h3 className="text-xl sm:text-2xl font-bold text-dark-text mb-3">{t('projects.musicReleases.title')}</h3>
              <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                <iframe 
                  src="https://open.spotify.com/embed/artist/4BTWTI3mEAVmYQbe94r0MY?utm_source=generator&theme=0" 
                  width="100%" 
                  height="352"
                  frameBorder="0" 
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  title="Spotify player for O$ka"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="text-dark-text/80 mb-4">
                <RenderHTML html={t('projects.musicReleases.description')} />
              </div>
              <a 
                href="https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors text-base sm:text-lg py-2 px-1"
                aria-label="Listen to O$ka on Spotify"
              >
                <i className="fa-brands fa-spotify"></i>
                <span>{t('projects.musicReleases.listenOn')}</span>
              </a>
            </article>

            {/* Project 2 */}
            <article className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01]">
              <h3 className="text-xl sm:text-2xl font-bold text-dark-text mb-3">{t('projects.youtubeCommentary.title')}</h3>
              <div 
                className="aspect-video bg-accent-secondary/30 rounded-lg mb-4 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]" 
                onClick={() => openModal("https://res.cloudinary.com/daaynrl8l/video/upload/commentary_clip_mobwhq.mp4")}
                role="button"
                aria-label="Open video modal"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openModal("https://res.cloudinary.com/daaynrl8l/video/upload/commentary_clip_mobwhq.mp4");
                  }
                }}
              >
                {/* Use poster and preload="none" for better performance */}
                <video 
                  className="w-full h-full object-cover" 
                  src="https://res.cloudinary.com/daaynrl8l/video/upload/commentary_clip_mobwhq.mp4"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  aria-label="Preview of YouTube Music Commentary video"
                  preload="none"
                  poster="https://res.cloudinary.com/daaynrl8l/image/upload/v1746152088/video_thumbnail_jaxofr.jpg"
                />
              </div>
              <div className="text-dark-text/80 mb-4">
                <RenderHTML html={t('projects.youtubeCommentary.description')} />
              </div>
              <a 
                href="https://www.youtube.com/@oska.hayati" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors text-base sm:text-lg py-2 px-1"
                aria-label="View O$ka's YouTube channel"
              >
                <i className="fa-brands fa-youtube"></i>
                <span>{t('projects.youtubeCommentary.viewOn')}</span>
              </a>
            </article>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="mb-12 md:mb-20 scroll-mt-20" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('experience.title')}</h2>
          <div className="space-y-4 sm:space-y-6">
            {/* Work Experience Cards */}
            <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 border-l-4 border-accent-secondary">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.euroarts.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://www.euroarts.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  EuroArts
                </a>
              </p>
              <p className="text-dark-text/70">{t('experience.euroarts.period')}</p>
            </div>

            <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 border-l-4 border-accent-secondary">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.kiacademy.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://ki.academy/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  KI-Academy
                </a>
              </p>
              <p className="text-dark-text/70">{t('experience.kiacademy.period')}</p>
            </div>

            {/* Education */}
            <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 border-l-4 border-accent-tertiary">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.education.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://studium.bimm-institute.de/" target="_blank" rel="noopener noreferrer" className="hover:underline">BIMM Berlin</a>
              </p>
              <p className="text-dark-text/70">{t('experience.education.period')}</p>
            </div>

            {/* Internship */}
            <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 border-l-4 border-accent-tertiary">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.internship.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://www.about-us-records.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  aboutusrecords
                </a>
              </p>
              <p className="text-dark-text/70">{t('experience.internship.period')}</p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="mb-12 md:mb-20 scroll-mt-20" aria-labelledby="blog-heading">
          <h2 id="blog-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('blog.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Blog Post Placeholders */}
            <div className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01]">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('blog.comingSoon')}</h3>
              <p className="text-dark-text/80 mt-2">{t('blog.description')}</p>
            </div>
            <div className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01]">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('blog.stayTuned')}</h3>
              <p className="text-dark-text/80 mt-2">{t('blog.description')}</p>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="mb-12 md:mb-20 scroll-mt-20" aria-labelledby="connect-heading">
          <h2 id="connect-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('connect.title')}</h2>
          <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-8">
            <div className="mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text mb-2">{t('connect.getInSection')}</h3>
              {/* Use the EmailLink component */}
              <EmailLink />
            </div>
            
            <div className="mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-dark-text mb-3 sm:mb-4">{t('connect.socialMedia')}</h3>
              {/* Use the SocialIcons component */}
              <SocialIcons />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-text mb-2">{t('connect.management')}</h3>
              <p className="text-dark-text/80">
                aboutusrecords{" "}
                <a 
                  href="mailto:info@about-us-records.com" 
                  className="text-accent-tertiary hover:text-dark-text transition-colors py-1 inline-block"
                >
                  info@about-us-records.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-accent-primary/30 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-dark-text/70">&copy; {new Date().getFullYear()} Ole Oskar Heinrichs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
