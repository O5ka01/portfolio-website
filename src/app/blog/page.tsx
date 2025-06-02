"use client";

import { useEffect } from 'react';
// No router import needed
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import ForceTranslationRefresh from '@/components/ForceTranslationRefresh';
import { motion } from 'framer-motion';

export default function BlogPage() {
  // No need for router as we're using window.location.href
  const { t } = useLanguage();
  
  // Redirect to Substack
  useEffect(() => {
    // Redirect after a short delay to allow the page to render first
    const timer = setTimeout(() => {
      window.location.href = 'https://oskahayati.substack.com';
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-warm-beige min-h-screen">
      <ForceTranslationRefresh />
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-8 pb-12 sm:py-16">
        <div className="text-center py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark-text mb-8">{t('blog.title')}</h1>
          
          <div className="mx-auto max-w-2xl bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] mb-8">
            <iframe 
              src="https://oskahayati.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: '1px solid #EEE', background: 'white' }} 
              frameBorder="0" 
              scrolling="no"
              title="OSKA Substack Newsletter"
              className="w-full"
            />
          </div>
          
          <p className="text-dark-text text-lg mb-6">
            {t('blog.redirecting')}
          </p>
          
          <motion.a 
            href="https://oskahayati.substack.com"
            className="inline-flex items-center py-2 px-4 bg-accent-tertiary text-white hover:bg-accent-tertiary/90 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('blog.visitSubstack')}
          </motion.a>
          
          <div className="mt-8">
            <motion.a 
              href="/"
              className="inline-flex items-center py-2 px-4 bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-lg cursor-pointer transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('blog.backToHome')}
            </motion.a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
