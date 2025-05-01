"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ImprintHeader from '@/components/ImprintHeader';
import Footer from '@/components/Footer';

export default function AGB() {
  const { language } = useLanguage();
  
  return (
    <div className="bg-warm-beige min-h-screen">
      <header>
        <ImprintHeader />
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-dark-text mb-8">
          {language === 'de' ? 'Allgemeine Geschäftsbedingungen' : 'Terms of Service'}
        </h1>
        
        {/* Scope and Provider */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '1. Geltungsbereich und Anbieter' : '1. Scope and Provider'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Diese Allgemeinen Geschäftsbedingungen gelten für alle Besuche und Nutzungen der Website portfolio-website-gold-xi.vercel.app (nachfolgend "Website") von:'
                : 'These Terms of Service apply to all visits and uses of the website portfolio-website-gold-xi.vercel.app (hereinafter "Website") by:'}
            </p>
            <p className="mt-4">Ole Oskar Heinrichs</p>
            <p>Mendelstr. 3</p>
            <p>13187 Berlin</p>
            <p>{language === 'de' ? 'Deutschland' : 'Germany'}</p>
            <p>{language === 'de' ? 'E-Mail' : 'Email'}: <a href="mailto:ooh.oska@outlook.de" className="text-accent-tertiary hover:underline">ooh.oska@outlook.de</a></p>
          </div>
        </div>

        {/* Subject Matter of the Website */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '2. Gegenstand der Website' : '2. Subject Matter of the Website'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Diese Website dient der Präsentation meines beruflichen Profils, meiner künstlerischen Arbeiten und meiner Dienstleistungen als Musiker und Marketing-Fachmann. Sie können meine Website besuchen und die bereitgestellten Informationen und Materialien zu rein informatorischen Zwecken nutzen.'
                : 'This website serves to present my professional profile, my artistic work, and my services as a musician and marketing professional. You may visit my website and use the provided information and materials for purely informational purposes.'}
            </p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '3. Geistiges Eigentum' : '3. Intellectual Property'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Alle auf dieser Website veröffentlichten Inhalte, einschließlich Texte, Bilder, Grafiken, Logos, Musikwerke, Videos, Audioaufnahmen und andere Materialien, sind urheberrechtlich geschützt und stehen im Eigentum von Ole Oskar Heinrichs oder wurden mit Genehmigung der Rechteinhaber verwendet.'
                : 'All content published on this website, including texts, images, graphics, logos, musical works, videos, audio recordings, and other materials, are protected by copyright and are owned by Ole Oskar Heinrichs or have been used with the permission of the rights holders.'}
            </p>
            <p className="mt-4">
              {language === 'de'
                ? 'Jede Nutzung, Vervielfältigung, Verbreitung, öffentliche Zugänglichmachung oder sonstige Verwertung dieser Inhalte, die über die gesetzlichen Schranken des Urheberrechts hinausgeht, bedarf der vorherigen schriftlichen Zustimmung.'
                : 'Any use, reproduction, distribution, public disclosure, or other exploitation of this content that goes beyond the legal limitations of copyright requires prior written consent.'}
            </p>
          </div>
        </div>

        {/* Use of the Website */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '4. Nutzung der Website' : '4. Use of the Website'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Die Nutzung dieser Website ist ausschließlich zu rechtmäßigen Zwecken und in einer Weise gestattet, die nicht gegen diese AGB verstößt oder Rechte Dritter verletzt. Es ist insbesondere untersagt:'
                : 'The use of this website is only permitted for lawful purposes and in a manner that does not violate these Terms of Service or infringe on the rights of third parties. In particular, it is prohibited to:'}
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                {language === 'de'
                  ? 'die Website oder ihre Inhalte in einer Weise zu verwenden, die die Funktionalität oder den Betrieb der Website beeinträchtigt'
                  : `use the website or its content in a way that impairs the functionality or operation of the website`}
              </li>
              <li>
                {language === 'de'
                  ? 'unbefugten Zugriff auf Systeme oder Netzwerke der Website zu erlangen'
                  : 'gain unauthorized access to systems or networks of the website'}
              </li>
              <li>
                {language === 'de'
                  ? 'Inhalte ohne ausdrückliche Genehmigung kommerziell zu nutzen'
                  : 'use content commercially without express permission'}
              </li>
              <li>
                {language === 'de'
                  ? 'schädliche Software oder Daten zu übermitteln, die die Website oder die Systeme der Nutzer schädigen könnten'
                  : `transmit harmful software or data that could damage the website or users' systems`}
              </li>
            </ul>
          </div>
        </div>

        {/* Liability */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '5. Haftung' : '5. Liability'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Dennoch übernehme ich keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
                : 'The content of this website is created with the utmost care. Nevertheless, I assume no liability for the accuracy, completeness, and timeliness of the provided content. As a service provider, I am responsible for my own content on these pages in accordance with general laws pursuant to § 7 para. 1 TMG. However, according to §§ 8 to 10 TMG, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.'}
            </p>
            <p className="mt-4">
              {language === 'de'
                ? 'Die Nutzung der auf dieser Website zur Verfügung gestellten Kontaktmöglichkeiten oder Inhalte erfolgt auf eigene Gefahr. Eine Haftung für Schäden, die direkt oder indirekt durch die Nutzung dieser Website entstehen, wird ausgeschlossen, soweit diese nicht auf Vorsatz oder grober Fahrlässigkeit beruhen.'
                : 'The use of the contact options or content provided on this website is at your own risk. Liability for damages directly or indirectly resulting from the use of this website is excluded, unless they are based on intent or gross negligence.'}
            </p>
          </div>
        </div>

        {/* External Links */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '6. Externe Links' : '6. External Links'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.'
                : 'This website contains links to external third-party websites, the content of which I have no influence over. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not apparent at the time of linking. However, a permanent content control of the linked pages is not reasonable without concrete evidence of a legal violation.'}
            </p>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '7. Änderungen der AGB' : '7. Changes to Terms'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Ich behalte mir das Recht vor, diese AGB jederzeit und ohne Vorankündigung zu ändern. Die geänderten Bedingungen werden auf dieser Seite veröffentlicht und treten mit ihrer Veröffentlichung in Kraft. Durch die fortgesetzte Nutzung der Website nach der Veröffentlichung von Änderungen erklären Sie sich mit diesen einverstanden.'
                : 'I reserve the right to change these Terms of Service at any time without prior notice. The amended terms will be published on this page and will take effect upon their publication. By continuing to use the website after the publication of changes, you agree to these changes.'}
            </p>
          </div>
        </div>

        {/* Applicable Law */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '8. Anwendbares Recht' : '8. Applicable Law'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Für diese AGB und alle Rechtsbeziehungen zwischen Ihnen und mir gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Berlin, Deutschland, soweit gesetzlich zulässig.'
                : 'These Terms of Service and all legal relationships between you and me are governed by the laws of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods. The place of jurisdiction is Berlin, Germany, to the extent permitted by law.'}
            </p>
          </div>
        </div>

        {/* Severability Clause */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '9. Salvatorische Klausel' : '9. Severability Clause'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.'
                : 'Should individual provisions of these Terms of Service be or become invalid, this shall not affect the validity of the remaining provisions.'}
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="flex justify-center mt-10">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-accent-secondary hover:bg-accent-secondary/80 text-dark-text rounded-lg transition-colors"
          >
            {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
