"use client";

import { useState, useEffect } from 'react';
import SocialIcons, { EmailLink } from '@/components/SocialIcons';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Footer from '@/components/Footer';

// Helper function to safely render HTML content
const RenderHTML = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function Home() {
  // Use useEffect to ensure this code only runs on the client
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();
  
  // Videos with browser-friendly backup image URLs
  const musicVideoData = {
    videoUrl: "https://res.cloudinary.com/daaynrl8l/video/upload/showcase_f6z4wq.mp4",
    imageUrl: "https://res.cloudinary.com/daaynrl8l/video/upload/so_auto/showcase_f6z4wq.jpg"
  };
  const commentaryVideoData = {
    videoUrl: "https://res.cloudinary.com/daaynrl8l/video/upload/commentary_clip_mobwhq.mp4",
    imageUrl: "https://res.cloudinary.com/daaynrl8l/video/upload/so_auto/commentary_clip_mobwhq.jpg"
  };
  
  // CSS styles as objects with proper TypeScript typing
  const videoWrapperStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    overflow: 'hidden' as const
  };
  
  // Completely revised video component that prioritizes working over features
  const BrowserFriendlyVideo = ({ videoData }: { videoData: { videoUrl: string, imageUrl: string } }) => {
    // Check if we're running in the browser
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
      setIsClient(true);
    }, []);
    
    // If we're not in the browser, just show a black div
    if (!isClient) {
      return <div className="w-full h-full bg-black" />;
    }
    
    // In the browser, try to use the HTML video element
    return (
      <div className="relative w-full h-full bg-black overflow-hidden">
        {/* Fallback image (always shown) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={videoData.imageUrl || "https://res.cloudinary.com/daaynrl8l/image/upload/placeholder.jpg"} 
            alt="Video placeholder"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Video overlay */}
        <video 
          className="absolute inset-0 z-10 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          controls={false}
          preload="auto"
        >
          <source src={videoData.videoUrl} type="video/mp4" />
        </video>
      </div>
    );
  };
  
  // Fix hydration mismatch by only rendering client-specific content after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a skeleton or simplified version for server rendering
    return <div className="bg-warm-beige min-h-screen"></div>;
  }

  return (
    <div className="bg-warm-beige min-h-screen">
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
            <article className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01] flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-dark-text mb-3">{t('projects.musicReleases.title')}</h3>
              <div 
                className="aspect-video bg-accent-secondary/30 rounded-lg mb-4 overflow-hidden" 
              >
                {/* Custom video player with no controls and auto-loop */}
                <div style={videoWrapperStyle}>
                  <BrowserFriendlyVideo videoData={musicVideoData} />
                </div>
              </div>
              <div className="text-dark-text/80 mb-4">
                <RenderHTML html={t('projects.musicReleases.description')} />
              </div>
              <div className="mt-auto flex items-center gap-4">
                <a 
                  href="https://open.spotify.com/artist/4BTWTI3mEAVmYQbe94r0MY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors text-base sm:text-lg py-2 px-1"
                  aria-label="Listen to O$ka on Spotify"
                >
                  <i className="fa-brands fa-spotify text-xl"></i>
                  <span>{t('projects.musicReleases.listenOn')}</span>
                </a>
                <a 
                  href="https://music.apple.com/us/artist/o%24ka/1640653279" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors text-base sm:text-lg py-2 px-1"
                  aria-label="Listen to O$ka on Apple Music"
                >
                  <i className="fa-brands fa-apple text-xl"></i>
                  <span>{t('projects.musicReleases.listenOnApple')}</span>
                </a>
              </div>
            </article>

            {/* Project 2 */}
            <article className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01] flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-dark-text mb-3">{t('projects.youtubeCommentary.title')}</h3>
              <div 
                className="aspect-video bg-accent-secondary/30 rounded-lg mb-4 overflow-hidden"
              >
                {/* Custom video player with no controls and auto-loop */}
                <div style={videoWrapperStyle}>
                  <BrowserFriendlyVideo videoData={commentaryVideoData} />
                </div>
              </div>
              <div className="text-dark-text/80 mb-4">
                <RenderHTML html={t('projects.youtubeCommentary.description')} />
              </div>
              <div className="mt-auto">
                <a 
                  href="https://www.youtube.com/@oska.hayati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors text-base sm:text-lg py-2 px-1"
                  aria-label="View O$ka's YouTube channel"
                >
                  <i className="fa-brands fa-youtube text-xl"></i>
                  <span>{t('projects.youtubeCommentary.viewOn')}</span>
                </a>
              </div>
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
          
          {/* Redesigned layout with cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Contact Card */}
            <div className="bg-accent-primary/10 rounded-xl p-6 flex flex-col h-full transition-transform hover:shadow-md">
              <h3 className="text-lg sm:text-xl font-medium text-dark-text mb-5 text-center">{t('connect.getInSection')}</h3>
              <div className="mb-6 flex justify-center">
                <EmailLink />
              </div>
              
              {/* Management Contact */}
              <div className="mt-auto">
                <h3 className="text-base font-medium text-dark-text mb-3 text-center">{t('connect.management')}</h3>
                <div className="flex justify-center">
                  <a 
                    href="mailto:info@about-us-records.com" 
                    className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-colors"
                    aria-label="Email Management"
                  >
                    <div className="bg-accent-secondary/40 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                      <FontAwesomeIcon icon={faEnvelope} className="text-dark-text" size="sm" />
                    </div>
                    <span>{t('connect.managementEmail')}</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Social Media Card */}
            <div className="bg-accent-primary/10 rounded-xl p-6 h-full transition-transform hover:shadow-md">
              <h3 className="text-lg sm:text-xl font-medium text-dark-text mb-5 text-center">{t('connect.socialMedia')}</h3>
              <div className="flex flex-wrap justify-center">
                <SocialIcons />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
