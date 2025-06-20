"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SubstackIcon from "@/components/SocialIcons";

// Utility: Parse Substack RSS feed (XML) to JSON
// (No changes needed here; kept for clarity and maintainability)
function parseRSS(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const items = Array.from(doc.querySelectorAll("item")).slice(0, 3);
  return items.map((item) => ({
    title: item.querySelector("title")?.textContent || "",
    link: item.querySelector("link")?.textContent || "",
    pubDate: item.querySelector("pubDate")?.textContent || "",
    description:
      item.querySelector("description")?.textContent?.replace(/(<([^>]+)>)/gi, "") || "",
  }));
}

export default function BlogPreview() {
  // BlogPost type for clarity
  type BlogPost = {
    title: string;
    link: string;
    pubDate: string;
    description: string;
  };
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState(false);
  const { t, language } = useLanguage();
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  // Lazy-load the iframe only if RSS fails and when the fallback is visible
  useEffect(() => {
    if (!error) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setShowIframe(true);
      },
      { threshold: 0.2 }
    );
    if (iframeRef.current) observer.observe(iframeRef.current);
    return () => observer.disconnect();
  }, [error]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const res = await fetch(
          "https://substack.com/@oskahayati/feed",
          { headers: { Accept: "application/rss+xml" } }
        );
        if (!res.ok) throw new Error("Failed to fetch RSS");
        const xml = await res.text();
        setPosts(parseRSS(xml));
      } catch {
        setError(true);
      }
    };
    fetchRSS();
  }, []);

  // Fallback: Show Substack embed in a beautiful, branded container if RSS fails
  if (error) {
    return (
      <motion.section
        ref={iframeRef}
        aria-label={t("blog.substackFallbackAria") || "Substack blog embed fallback"}
        className="w-full animate-fadeIn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-dark-text mb-4">
          {t("blog.title") || "Blog & Insights"}
        </h2>
        <div className="text-lg text-dark-text/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t("blog.description") || "Latest thoughts, stories, and updates from O$ka on Substack."}
        </div>
        <div className="w-full flex flex-col items-center">
          {showIframe ? (
            <iframe
              src="https://substack.com/@oskahayati/embed"
              width="100%"
              height="320"
              style={{ border: 'none', background: 'transparent', width: '100%', minHeight: 320 }}
              frameBorder="0"
              scrolling="no"
              title="Substack Blog Embed"
              aria-label={t("blog.substackIframeAria") || "Embedded Substack blog"}
            />
          ) : (
            <div className="w-full h-[320px] flex items-center justify-center text-accent animate-pulse bg-transparent">
              <SubstackIcon size="lg" />
            </div>
          )}
          <a
            href="https://substack.com/@oskahayati"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-accent hover:underline text-sm font-medium flex items-center gap-1"
          >
            {t("blog.visitSubstack") || "Read all on Substack"}
            <span aria-hidden>→</span>
          </a>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      aria-label={t("blog.aria") || "Latest blog posts"}
      className="w-full animate-fadeIn"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-dark-text mb-4">
        {t("blog.title") || "Blog & Insights"}
      </h2>
      <div className="text-lg text-dark-text/80 mb-8 max-w-2xl mx-auto leading-relaxed">
        {t("blog.description") || "Latest thoughts, stories, and updates from O$ka on Substack."}
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <div key={post.link} className="flex flex-col gap-1">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-accent hover:underline focus:underline transition-colors"
            >
              {post.title}
            </a>
            <time className="text-xs text-muted-foreground" dateTime={post.pubDate}>
              {new Date(post.pubDate).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <div className="text-sm text-foreground truncate">
              {post.description}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <a
          href="https://substack.com/@oskahayati"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline text-sm font-medium flex items-center gap-1"
        >
          {t("blog.visitSubstack") || "Read all on Substack"}
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.section>
  );
}
