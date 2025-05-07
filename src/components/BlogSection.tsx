"use client";

import { useLanguage } from '@/context/LanguageContext';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date: string;
  author: string;
  tags: string[];
  imageUrl: string;
}

export default function BlogSection() {
  const { t, language } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load blog posts based on current language
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        // Dynamic import based on language
        const posts = language === 'en'
          ? await import('@/data/blogPosts_en.json').then(module => module.default)
          : await import('@/data/blogPosts_de.json').then(module => module.default);
          
        // Sort by date (newest first)
        const sortedPosts = [...posts].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();
  }, [language]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Return skeleton/placeholder during loading
  if (isLoading) {
    return (
      <section id="blog" className="mb-12 md:mb-20 scroll-mt-20" aria-labelledby="blog-heading">
        <h2 id="blog-heading" className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8">{t('blog.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 h-64 animate-pulse"></div>
          <div className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 h-64 animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="mb-12 md:mb-20 scroll-mt-20" aria-labelledby="blog-heading">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 id="blog-heading" className="text-2xl sm:text-3xl font-bold text-dark-text">{t('blog.title')}</h2>
        
        {/* View All Button */}
        <Link href="/blog" passHref>
          <motion.span 
            className="inline-flex items-center py-2 px-4 bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('blog.viewAll')}
          </motion.span>
        </Link>
      </div>
      
      {blogPosts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Display first two blog posts */}
          {blogPosts.slice(0, 2).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      ) : (
        // Fallback if no posts are available
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('blog.comingSoon')}</h3>
            <p className="text-dark-text/80 mt-2">{t('blog.description')}</p>
          </div>
          <div className="bg-accent-primary/20 rounded-xl p-4 sm:p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg sm:text-xl font-bold text-dark-text">{t('blog.stayTuned')}</h3>
            <p className="text-dark-text/80 mt-2">{t('blog.description')}</p>
          </div>
        </div>
      )}
    </section>
  );
}
