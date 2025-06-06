"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function SubstackEmbed() {
  const { t } = useLanguage();
  
  // Add script for Substack embed after component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://substack.com/embedjs/embed.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full overflow-hidden rounded-xl bg-gradient-to-br from-accent-secondary/5 to-accent-tertiary/10 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-300 border border-accent-secondary/10">
        <motion.div 
          className="w-full rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Substack Post */}
          <div className="substack-post-embed p-5 bg-white/90 backdrop-blur-sm rounded-t-lg border border-accent-secondary/10 border-b-0">
            <p lang="en" className="text-lg font-semibold text-dark-text">Sustain & Release by O$ka</p>
            <p className="text-sm text-dark-text/70 mb-3">Balancing discipline with passion</p>
            <a 
              data-post-link 
              href="https://oskahayati.substack.com/p/sustain-and-release"
              className="inline-block px-3 py-1 bg-accent-secondary/10 hover:bg-accent-secondary/20 text-accent-tertiary rounded-md transition-colors duration-200 text-sm"
            >
              Read on Substack
            </a>
          </div>
          
          {/* General Newsletter Embed */}
          <iframe 
            src="https://oskahayati.substack.com/embed" 
            width="100%" 
            height="150" 
            style={{ border: '1px solid #EEE', background: 'white' }} 
            frameBorder="0" 
            scrolling="no"
            title="OSKA Substack Newsletter"
            className="w-full rounded-b-lg"
          />
        </motion.div>
        
        <div className="mt-4 text-center">
          <a 
            href="https://oskahayati.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-tertiary text-white hover:bg-accent-tertiary/95 transition-all duration-300 ease-out text-sm py-2.5 px-5 rounded-full shadow-sm hover:shadow"
          >
            <i className="fa-solid fa-newspaper text-xs"></i>
            {t('blog.visitSubstack')}
          </a>
        </div>
      </div>
    </div>
  );
}
