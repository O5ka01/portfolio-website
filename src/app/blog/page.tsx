"use client";

import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import ForceTranslationRefresh from '@/components/ForceTranslationRefresh';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-warm-beige min-h-screen">
      <ForceTranslationRefresh />
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-8 pb-12 sm:py-16">
        <div className="text-center py-16">
          <motion.h1 
            className="text-3xl sm:text-5xl font-bold text-dark-text mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('blog.title')}
          </motion.h1>
          
          {/* Enhanced coming soon card with gradient background */}
          <motion.div 
            className="mx-auto max-w-3xl overflow-hidden mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative bg-gradient-to-br from-accent-primary/20 via-white to-accent-tertiary/20 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 sm:p-12 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-accent-primary/10 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent-tertiary/10 rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/4 right-10 w-16 h-16 bg-accent-secondary/20 rounded-full"></div>
              <div className="absolute bottom-1/4 left-10 w-12 h-12 bg-accent-primary/20 rounded-full"></div>
              
              <div className="relative flex flex-col items-center justify-center py-16 z-10">
                {/* Coming soon animated icon */}
                <motion.div 
                  className="w-32 h-32 mb-8 flex items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.4 
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-accent-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </motion.div>
                </motion.div>
                
                {/* Coming soon text with enhanced typography */}
                <motion.h2 
                  className="text-3xl sm:text-4xl font-bold text-accent-tertiary mb-6 tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {t('blog.comingSoon')}
                </motion.h2>
                
                <motion.p 
                  className="text-dark-text text-xl mb-8 max-w-lg text-center leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {t('blog.description')}
                </motion.p>
                
                {/* Animated stay tuned badge */}
                <motion.div 
                  className="inline-flex items-center py-3 px-6 bg-accent-tertiary text-white rounded-full mb-8 shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <motion.span 
                    className="mr-2 text-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >✨</motion.span>
                  <span className="font-medium">{t('blog.stayTuned')}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.a 
              href="/"
              className="inline-flex items-center py-3 px-6 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg cursor-pointer transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {t('blog.backToHome')}
            </motion.a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
