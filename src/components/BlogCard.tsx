"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleCardClick = () => {
    setIsExpanded(true);
    // Lock scroll on body when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsExpanded(false);
    // Restore scroll on body when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Blog Card (Collapsed State) */}
      <motion.div 
        className="bg-accent-primary/10 rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-400 ease-apple shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-accent-secondary/5"
        onClick={handleCardClick}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col h-full">
          {post.imageUrl && (
            <div className="relative w-full h-48 mb-5 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          )}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-dark-text mb-3 leading-tight">{post.title}</h3>
          <p className="text-accent-tertiary/80 text-xs uppercase tracking-wider mb-4 font-medium">{formatDate(post.date)}</p>
          <p className="text-dark-text/80 text-base sm:text-lg leading-relaxed">{post.excerpt}</p>
          <div className="mt-4 pt-2 text-accent-tertiary font-medium border-t border-accent-secondary/10">
            {t('blog.readMore')}
          </div>
        </div>
      </motion.div>

      {/* Expanded Blog Post Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-background/95 backdrop-blur-md w-full max-w-4xl h-[90vh] rounded-xl overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-accent-secondary/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Minimal Close Button (always visible, fixed position) */}
              <button
                onClick={handleClose}
                className="fixed z-10 top-4 right-4 w-8 h-8 bg-warm-beige text-dark-text border border-accent-primary/20 rounded-full flex items-center justify-center transition-colors hover:bg-accent-primary hover:text-white"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
              </button>
              
              {/* Blog Post Header (Minimalist) */}
              <header className="pt-12 px-8 md:px-16 pb-6 border-b border-accent-primary/10">
                <h2 className="text-2xl sm:text-3xl font-bold text-dark-text mb-4">{post.title}</h2>
                <div className="flex items-center text-dark-text/70 text-sm mb-6">
                  <span className="font-medium">{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                
                {/* Tags (moved to header) */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-accent-primary/10 text-accent-tertiary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              
              {/* Featured Image (if available) */}
              {post.imageUrl && (
                <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                </div>
              )}
              
              {/* Blog Post Content */}
              <div ref={contentRef} className="p-8 md:p-16 pt-10">
                <div 
                  className="prose prose-lg max-w-none text-dark-text prose-headings:text-dark-text prose-headings:font-medium prose-p:text-dark-text/90 prose-a:text-accent-tertiary prose-a:no-underline hover:prose-a:underline" 
                  style={{ color: '#333333' }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
