"use client";

import { useLanguage } from '@/context/LanguageContext';
import LegalPageHeader from '@/components/LegalPageHeader';
import Footer from '@/components/Footer';
import SEOEnhancer from '@/components/SEOEnhancer';

export default function Impressum() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SEOEnhancer />
      <LegalPageHeader />
      
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-light mb-8">
          {language === 'de' ? 'Impressum' : 'Imprint'}
        </h1>
        
        <div className="space-y-6 text-neutral-700">
          <section>
            <h2 className="text-xl font-medium mb-3 text-neutral-900">
              {language === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
            </h2>
            <p>Ole Oskar Heinrichs</p>
            <p>Musikproduzent & Marketing Professional</p>
            <p>Deutschland</p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-3 text-neutral-900">
              {language === 'de' ? 'Kontakt' : 'Contact'}
            </h2>
            <p>E-Mail: ooh.oska@outlook.de</p>
            <p>Instagram: @oskamusic</p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-3 text-neutral-900">
              {language === 'de' ? 'Berufshaftpflichtversicherung' : 'Professional Liability Insurance'}
            </h2>
            <p className="text-sm">
              {language === 'de' 
                ? 'Als freiberuflicher Künstler und Marketing Professional bin ich entsprechend versichert.'
                : 'As a freelance artist and marketing professional, I am appropriately insured.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-3 text-neutral-900">
              {language === 'de' ? 'Verantwortlich für den Inhalt' : 'Responsible for Content'}
            </h2>
            <p>Ole Oskar Heinrichs</p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-3 text-neutral-900">
              {language === 'de' ? 'Streitschlichtung' : 'Dispute Resolution'}
            </h2>
            <p className="text-sm">
              {language === 'de'
                ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/. You can find our email address above in the imprint. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
