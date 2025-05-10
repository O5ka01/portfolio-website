"use client";

import { useState, useEffect } from 'react';
import SocialIcons, { EmailLink } from '@/components/SocialIcons';
import Image from 'next/image';
import { getNextImageProps } from '@/utils/imageOptimization';
import { useLanguage } from '@/context/LanguageContext';
import ResponsiveNavbar from '@/components/ResponsiveNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';
import ForceTranslationRefresh from '@/components/ForceTranslationRefresh';
import ScrollAnimationSection from '@/components/ScrollAnimationSection';

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
  
  // Force translation refresh to ensure new keys are loaded
  // This helps fix issues with showing raw translation keys like "blog.readMore"

  return (
    <div className="bg-warm-beige min-h-screen">
      {/* Navigation - Using the new Responsive Navbar */}
      <header>
        <ResponsiveNavbar />
        <ForceTranslationRefresh />
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header Section */}
        <ScrollAnimationSection 
          className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-16 md:mb-24 mt-8"
          animation="fade"
          duration={0.9}
        >
          <div className="w-full md:w-1/2 space-y-5 md:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-text tracking-tight">{t('header.title')}</h1>
            <p className="text-lg sm:text-xl text-accent-tertiary">{t('header.subtitle')}</p>
            <h2 className="text-xl sm:text-2xl font-medium text-dark-text">{t('header.profession')}</h2>
            <p className="text-base sm:text-lg text-dark-text/80 leading-relaxed max-w-xl">
              {t('header.description')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center py-4">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
              <Image 
                {...getNextImageProps('WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg', {
                  quality: 95, // Using very high quality
                  responsive: true,
                  format: 'webp' // Using modern format for better quality/size ratio
                })}
                alt="Ole Oskar Heinrichs (O$ka) - Musician and Marketing Professional"
                fill
                sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 16rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </ScrollAnimationSection>

        {/* Latest Release Section */}
        <ScrollAnimationSection 
          className="mb-16 md:mb-24 py-4"
          animation="fade"
          delay={100}
          duration={1.2}
        >
          <div className="bg-accent-primary/15 rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.14)] transition-all duration-500 border border-accent-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              {/* Video Container - Adjusted for 4:3 aspect ratio */}
              <div className="md:col-span-5 md:order-2 p-4 md:p-8 flex justify-center">
                <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-tertiary/10 z-0"></div>
                  <video 
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    controls={false}
                    preload="auto"
                  >
                    <source src="https://res.cloudinary.com/daaynrl8l/video/upload/Wegen_mir_website_nbqr2t.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="md:col-span-7 md:order-1 p-6 md:p-10 md:pr-2">
                <div className="flex flex-col items-start space-y-6">
                  {/* Release Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="inline-block h-px w-6 bg-accent-tertiary"></span>
                      <span className="text-xs uppercase tracking-wider text-accent-tertiary font-medium">{t('latestRelease.new')}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-text tracking-tight">Wegen Mir</h2>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://oska.lnk.to/WegenMir" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent-tertiary text-white hover:bg-accent-tertiary/95 transition-all duration-300 ease-out text-sm py-2.5 px-5 rounded-full shadow-sm hover:shadow"
                    >
                      <i className="fa-solid fa-play text-xs"></i>
                      <span>{t('latestRelease.streamNow')}</span>
                    </a>
                    
                    <div className="flex gap-3 mt-2 md:mt-0">
                      <a 
                        href="https://www.instagram.com/oska.hayati/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-dark-text/5 text-dark-text hover:bg-dark-text/8 transition-all duration-300 ease-out rounded-full shadow-sm hover:shadow"
                        aria-label={t('latestRelease.followMe')}
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                      <a 
                        href="https://youtu.be/B4JAMlgGfpw?si=JwwUhuBshZyHoYsz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-dark-text/5 text-dark-text hover:bg-dark-text/8 transition-all duration-300 ease-out rounded-full shadow-sm hover:shadow"
                        aria-label={t('latestRelease.watchVideo')}
                      >
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationSection>
        
        {/* Projects Section */}
        <ScrollAnimationSection 
          id="projects" 
          className="mb-16 md:mb-28 py-6 scroll-mt-20" 
          animation="slide-up"
          duration={0.8}
          aria-labelledby="projects-heading"
        >
          <h2 id="projects-heading" className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-text mb-8 sm:mb-12 transition-all duration-300 hover:text-accent-tertiary">{t('projects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Project 1 */}
            <article className="bg-accent-primary/10 rounded-xl p-8 sm:p-10 transition-all duration-400 ease-apple hover:scale-[1.005] flex flex-col shadow-[0_5px_15px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-accent-secondary/10 group animate-scaleIn" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-dark-text mb-5 group-hover:text-accent-tertiary transition-colors duration-300">{t('projects.musicReleases.title')}</h3>
              <div 
                className="aspect-video bg-accent-secondary/20 rounded-xl mb-6 overflow-hidden shadow-sm" 
              >
                {/* Custom video player with no controls and auto-loop */}
                <div style={videoWrapperStyle}>
                  <BrowserFriendlyVideo videoData={musicVideoData} />
                </div>
              </div>
              <div className="text-dark-text/80 mb-6 text-base sm:text-lg leading-relaxed">
                <RenderHTML html={t('projects.musicReleases.description')} />
              </div>
              <div className="mt-auto flex items-center gap-6">
                <a 
                  href="https://open.spotify.com/artist/4BTWTI3mEAVmYQbe94r0MY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-all duration-300 ease-apple text-base sm:text-lg py-2 px-4 rounded-full hover:bg-accent-primary/10 hover:shadow-sm"
                  aria-label="Listen to O$ka on Spotify"
                >
                  <i className="fa-brands fa-spotify text-xl"></i>
                  <span>{t('projects.musicReleases.listenOn')}</span>
                </a>
                <a 
                  href="https://music.apple.com/us/artist/o%24ka/1640653279" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-all duration-300 ease-apple text-base sm:text-lg py-2 px-4 rounded-full hover:bg-accent-primary/10 hover:shadow-sm"
                  aria-label="Listen to O$ka on Apple Music"
                >
                  <i className="fa-brands fa-apple text-xl"></i>
                  <span>{t('projects.musicReleases.listenOnApple')}</span>
                </a>
              </div>
            </article>

            {/* Project 2 */}
            <article className="bg-accent-primary/10 rounded-xl p-8 sm:p-10 transition-all duration-400 ease-apple hover:scale-[1.005] flex flex-col shadow-[0_5px_15px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-accent-secondary/10 group animate-scaleIn" style={{ animationDelay: '250ms' }}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-dark-text mb-5 group-hover:text-accent-tertiary transition-colors duration-300">{t('projects.youtubeCommentary.title')}</h3>
              <div 
                className="aspect-video bg-accent-secondary/20 rounded-xl mb-6 overflow-hidden shadow-sm"
              >
                {/* Custom video player with no controls and auto-loop */}
                <div style={videoWrapperStyle}>
                  <BrowserFriendlyVideo videoData={commentaryVideoData} />
                </div>
              </div>
              <div className="text-dark-text/80 mb-6 text-base sm:text-lg leading-relaxed">
                <RenderHTML html={t('projects.youtubeCommentary.description')} />
              </div>
              <div className="mt-auto flex items-center">
                <a 
                  href="https://www.youtube.com/@oska.hayati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-tertiary hover:text-dark-text transition-all duration-300 ease-apple text-base sm:text-lg py-2 px-4 rounded-full hover:bg-accent-primary/10 hover:shadow-sm"
                  aria-label="View O$ka's YouTube channel"
                >
                  <i className="fa-brands fa-youtube text-xl"></i>
                  <span>{t('projects.youtubeCommentary.viewOn')}</span>
                </a>
              </div>
            </article>
          </div>
        </ScrollAnimationSection>

        {/* Experience & Education Section */}
        <ScrollAnimationSection
          id="experience"
          className="mb-12 md:mb-20 scroll-mt-20"
          animation="slide-up"
          duration={0.8}
          delay={100}
          aria-labelledby="experience-heading"
        >
          <h2 id="experience-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('experience.title')}</h2>
          <div className="space-y-4 sm:space-y-6">
            {/* Work Experience Cards */}
            <div className="bg-accent-primary/15 rounded-xl p-4 sm:p-6 border-l-4 border-accent-secondary animate-slideUp shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)]" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.euroarts.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://www.euroarts.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  EuroArts
                </a>
              </p>
              <p className="text-dark-text/70">{t('experience.euroarts.period')}</p>
            </div>

            <div className="bg-accent-primary/15 rounded-xl p-4 sm:p-6 border-l-4 border-accent-secondary animate-slideUp shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.kiacademy.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://ki.academy/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  KI-Academy
                </a>
              </p>
              <p className="text-dark-text/70">{t('experience.kiacademy.period')}</p>
            </div>

            {/* Education */}
            <div className="bg-accent-primary/15 rounded-xl p-4 sm:p-6 border-l-4 border-accent-tertiary animate-slideUp shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.education.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://studium.bimm-institute.de/" target="_blank" rel="noopener noreferrer" className="hover:underline">BIMM Berlin</a>
              </p>
              <p className="text-dark-text/70">{t('experience.education.period')}</p>
            </div>

            {/* Internship */}
            <div className="bg-accent-primary/15 rounded-xl p-4 sm:p-6 border-l-4 border-accent-tertiary animate-slideUp shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('experience.internship.title')}</h3>
              <p className="text-accent-tertiary">
                <a href="https://www.about-us-records.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  aboutusrecords
                </a>
              </p>
              <p className="text-dark-text/70">{t('experience.internship.period')}</p>
            </div>
          </div>
        </ScrollAnimationSection>

        {/* Blog Section - Wrapped in ScrollAnimationSection */}
        <ScrollAnimationSection
          className="mb-12 md:mb-20"
          animation="slide-up"
          duration={0.8}
          delay={200}
        >
          <BlogSection />
        </ScrollAnimationSection>

        {/* Connect Section */}
        <ScrollAnimationSection
          id="connect"
          className="mb-12 md:mb-20 scroll-mt-20"
          animation="fade"
          duration={0.8}
          delay={300}
          aria-labelledby="connect-heading"
        >
          <h2 id="connect-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('connect.title')}</h2>
          
          {/* Redesigned layout with cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Contact Card */}
            <div className="bg-accent-primary/15 rounded-xl p-6 flex flex-col h-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_5px_16px_rgba(0,0,0,0.12)] animate-fadeIn" style={{ animationDelay: '150ms' }}>
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
            <div className="bg-accent-primary/10 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-md animate-fadeIn" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg sm:text-xl font-medium text-dark-text mb-5 text-center">{t('connect.socialMedia')}</h3>
              <div className="flex flex-wrap justify-center">
                <SocialIcons />
              </div>
            </div>
          </div>
        </ScrollAnimationSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
