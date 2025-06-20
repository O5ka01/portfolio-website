"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SUBSTACK_URL = "https://substack.com/@oskahayati/embed";
const SUBSTACK_DIRECT = "https://substack.com/@oskahayati";

export default function SubstackEmbed() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      aria-labelledby="blog-heading"
      className="w-full flex flex-col items-center mb-12 md:mb-20"
    >
      <h2
        id="blog-heading"
        className="text-2xl sm:text-3xl font-bold text-dark-text mb-6 sm:mb-8 text-center"
      >
        {t("blog.title")}
      </h2>
      <div
        className={`substack-embed-container transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        aria-live="polite"
      >
        <iframe
          src={SUBSTACK_URL}
          title="O$ka Substack Blog Embed"
          className="w-full"
          tabIndex={0}
          loading="lazy"
          frameBorder={0}
          scrolling="no"
          aria-label={t("blog.title")}
        />
      </div>
      <a
        href={SUBSTACK_DIRECT}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 ghost-button"
        aria-label={t("blog.readOnSubstack")}
      >
        {t("blog.readOnSubstack")}
      </a>
    </section>
  );
}
