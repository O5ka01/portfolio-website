"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import BlogCard from '@/components/BlogCard';
import BlogNavbar from '@/components/BlogNavbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ForceTranslationRefresh from '@/components/ForceTranslationRefresh';

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

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

        // Extract all unique tags
        const tags = sortedPosts.flatMap(post => post.tags || []);
        setAllTags([...new Set(tags)]);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();
  }, [language]);

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filter posts by tag and search term
  const filteredPosts = blogPosts
    .filter(post => !selectedTag || (post.tags && post.tags.includes(selectedTag)))
    .filter(post => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(search)))
      );
    });

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
      <div className="bg-warm-beige min-h-screen">
        <BlogNavbar onSearch={handleSearch} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark-text mb-8">{t('blog.title')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-accent-primary/10 rounded-xl p-4 sm:p-6 h-64 animate-pulse"></div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-warm-beige min-h-screen">
      <BlogNavbar onSearch={handleSearch} />
      <ForceTranslationRefresh />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Tag filtering */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-dark-text mb-3">{t('blog.categories')}</h2>
            <div className="flex flex-wrap gap-2">
              <motion.button 
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg text-sm ${!selectedTag ? 'bg-accent-primary text-white' : 'bg-accent-primary/20 text-accent-tertiary'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('blog.allTags')}
              </motion.button>
              {allTags.map(tag => (
                <motion.button 
                  key={tag} 
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm ${selectedTag === tag ? 'bg-accent-primary text-white' : 'bg-accent-primary/20 text-accent-tertiary'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      
        {filteredPosts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-dark-text text-lg">
              {selectedTag ? t('blog.noPostsWithTag') : t('blog.noPostsYet')}
            </p>
            {selectedTag && (
              <button 
                onClick={() => setSelectedTag(null)}
                className="mt-4 px-4 py-2 bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-lg transition-colors"
              >
                {t('blog.viewAllPosts')}
              </button>
            )}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/" passHref>
            <motion.span 
              className="inline-flex items-center py-2 px-4 bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-lg cursor-pointer transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('blog.backToHome')}
            </motion.span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
