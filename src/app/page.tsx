'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import ResponsiveNavbar from '@/components/ResponsiveNavbar'
import Footer from '@/components/Footer'
import SEOEnhancer from '@/components/SEOEnhancer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faSpotify, faInstagram, faYoutube, faSoundcloud, faBandcamp, faApple } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <SEOEnhancer />
      
      <div className="min-h-screen bg-white">
        <ResponsiveNavbar />
        
        <main className="pt-16">
          {/* Artist Identity */}
          <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] brand-hero text-black leading-[0.85] mb-12">
                O$ka
              </h1>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12">
                <span className="text-xl md:text-2xl font-light text-neutral-400 tracking-[0.3em] uppercase">songwriter</span>
                <span className="text-xl md:text-2xl font-light text-neutral-400 tracking-[0.3em] uppercase">producer</span>
                <span className="text-xl md:text-2xl font-light text-neutral-400 tracking-[0.3em] uppercase">performer</span>
              </div>
            </div>
          </section>

          {/* Featured New Release */}
          <section id="music" className="py-20 px-6 bg-neutral-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  {t('home.newRelease.label')}
                </p>
                <h2 className="text-5xl font-extralight text-black mb-6 tracking-tight">
                  Falsche Idole
                </h2>
                <p className="text-lg font-light text-neutral-600 mb-8">
                  {t('home.newRelease.description')}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Featured Bandcamp Embed */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=641840065/size=large/bgcol=ffffff/linkcol=e99708/tracklist=false/transparent=true/" 
                    title="Falsche Idole by O$ka - New Release"
                  />
                </div>

                {/* Streaming Links */}
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-light text-black mb-6">
                    {t('home.newRelease.listenEverywhere')}
                  </h3>
                  <a
                    href="https://oska.lnk.to/Idole"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-8 py-4 font-light tracking-wide hover:bg-neutral-800 transition-colors duration-300"
                  >
                    {t('home.newRelease.streamNow')}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Discography */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-20">
                <h2 className="text-4xl font-extralight text-black mb-4 tracking-tight">
                  {t('home.discography.title')}
                </h2>
                <div className="w-16 h-px bg-neutral-300 mx-auto" />
              </div>

              {/* Discography Grid - Excluding Featured Track */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                {/* Wegen Mir */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=829471641/size=large/bgcol=ffffff/linkcol=e99708/tracklist=false/transparent=true/" 
                    title="Wegen Mir by O$ka"
                  />
                </div>

                {/* Don't give a fuck */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=1310404552/size=large/bgcol=ffffff/linkcol=de270f/tracklist=false/transparent=true/" 
                    title="Don't give a fuck by O$ka"
                  />
                </div>

                {/* Alle meine Homies essen auf */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=1563685798/size=large/bgcol=ffffff/linkcol=f171a2/tracklist=false/transparent=true/" 
                    title="Alle meine Homies essen auf by O$ka"
                  />
                </div>

                {/* Intervention */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=571788196/size=large/bgcol=ffffff/linkcol=f171a2/tracklist=false/transparent=true/" 
                    title="Intervention by O$ka"
                  />
                </div>

                {/* Rockstar */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=758771639/size=large/bgcol=ffffff/linkcol=de270f/tracklist=false/transparent=true/" 
                    title="Rockstar by O$ka"
                  />
                </div>

                {/* So Oft Gesagt */}
                <div className="w-full max-w-[350px]">
                  <iframe 
                    style={{border: 0, width: '100%', height: '442px'}} 
                    src="https://bandcamp.com/EmbeddedPlayer/track=2588520989/size=large/bgcol=ffffff/linkcol=de270f/tracklist=false/transparent=true/" 
                    title="So Oft Gesagt by O$ka"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Music Videos */}
          <section id="videos" className="py-20 px-6 bg-neutral-50">
            <div className="max-w-4xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-20">
                <h2 className="text-4xl font-extralight text-black mb-4 tracking-tight">
                  {t('home.musicVideos.title')}
                </h2>
                <div className="w-16 h-px bg-neutral-300 mx-auto" />
              </div>

              {/* Video Content */}
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-black mb-2">Wegen Mir</h3>
                  <p className="text-sm text-neutral-500">{t('home.musicVideos.officialMusicVideo')}</p>
                </div>
                
                <div className="relative max-w-sm mx-auto md:max-w-lg lg:max-w-2xl">
                  <a 
                    href="https://www.youtube.com/watch?v=B4JAMlgGfpw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group cursor-pointer"
                  >
                    {/* 4:3 Aspect Ratio Container */}
                    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg" style={{aspectRatio: '4/3'}}>
                      {/* Cloudinary Video - Centered with letterboxing */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <iframe
                          src="https://player.cloudinary.com/embed/?cloud_name=daaynrl8l&public_id=Wegen_mir_website_nbqr2t&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false"
                          className="w-full h-full object-cover"
                          style={{
                            width: '120%',
                            height: '120%',
                            marginLeft: '-10%',
                            marginTop: '-5%'
                          }}
                          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                          title="Wegen Mir - Official Music Video"
                        />
                      </div>
                      
                      {/* Click Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-lg">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75 text-white px-6 py-3 rounded-lg text-sm font-light flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>{t('home.video.watchOnYoutube')}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Essential Information */}
          <section id="blog" className="py-24 px-6">
            <div className="max-w-2xl mx-auto text-center space-y-16">
              {/* Blog */}
              <div>
                <h2 className="text-3xl font-extralight text-black mb-8 tracking-tight">
                  {t('home.blog.title')}
                </h2>
                <div className="flex justify-center">
                  <iframe 
                    src="https://oskahayati.substack.com/embed" 
                    width="480" 
                    height="320" 
                    style={{border: '1px solid #EEE', background: 'white', maxWidth: '100%'}} 
                    frameBorder="0" 
                    scrolling="no"
                    className="rounded-lg shadow-sm"
                    title="Substack Blog"
                  />
                </div>
              </div>

              {/* Connect */}
              <div id="connect">
                <h2 className="text-3xl font-extralight text-black mb-8 tracking-tight">
                  {t('home.connect.title')}
                </h2>
                
                {/* Social Links */}
                <div className="flex justify-center items-center space-x-8 mb-12">
                  <a
                    href="https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY?si=FBpspC__S7-hAWI5Omf3gQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-black transition-colors duration-300"
                    aria-label="Spotify"
                  >
                    <FontAwesomeIcon icon={faSpotify} className="text-2xl" />
                  </a>
                  <a
                    href="https://oskamusic.bandcamp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-black transition-colors duration-300"
                    aria-label="Bandcamp"
                  >
                    <FontAwesomeIcon icon={faBandcamp} className="text-2xl" />
                  </a>
                  <a
                    href="https://www.instagram.com/oska.hayati/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-black transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                  </a>
                  <a
                    href="https://www.youtube.com/@oska.hayati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-black transition-colors duration-300"
                    aria-label="YouTube"
                  >
                    <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
                  </a>
                  <a
                    href="https://on.soundcloud.com/yc2BjCAlBb9tYhwGk5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-black transition-colors duration-300"
                    aria-label="SoundCloud"
                  >
                    <FontAwesomeIcon icon={faSoundcloud} className="text-2xl" />
                  </a>
                  <a
                    href="https://music.apple.com/us/artist/o%24ka/1640653279"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-black transition-colors duration-300"
                    aria-label="Apple Music"
                  >
                    <FontAwesomeIcon icon={faApple} className="text-2xl" />
                  </a>
                </div>

                {/* Contact */}
                <a
                  href="mailto:info@about-us-records.com"
                  className="inline-flex items-center space-x-3 text-neutral-600 hover:text-black transition-colors duration-300 font-light"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                  <span>info@about-us-records.com</span>
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
