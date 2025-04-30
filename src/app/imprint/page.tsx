"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ImprintHeader from '@/components/ImprintHeader';

export default function Imprint() {
  const { language } = useLanguage();
  
  return (
    <div className="bg-warm-beige min-h-screen">
      <header>
        <ImprintHeader />
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-dark-text mb-8">
          {language === 'de' ? 'Impressum' : 'Imprint'}
        </h1>
        
        {/* TMG Information */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>Ole Oskar Heinrichs</p>
            <p>Mendelstr. 3</p>
            <p>13187 Berlin</p>
            <p>{language === 'de' ? 'Deutschland' : 'Germany'}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Kontaktmöglichkeiten' : 'Contact Options'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>{language === 'de' ? 'E-Mail' : 'Email'}: <a href="mailto:ooh.oska@outlook.de" className="text-accent-tertiary hover:underline">ooh.oska@outlook.de</a></p>
          </div>
        </div>

        {/* VAT ID */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Umsatzsteuer-Identifikationsnummer' : 'VAT Identification Number'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>{language === 'de' ? 'Keine Umsatzsteuer-ID vorhanden, da private Website' : 'No VAT ID available, as this is a private website'}</p>
          </div>
        </div>

        {/* Responsible Person */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Inhaltlich Verantwortlicher' : 'Responsible for Content'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>{language === 'de' ? 'Ole Oskar Heinrichs (Anschrift wie oben)' : 'Ole Oskar Heinrichs (address as above)'}</p>
          </div>
        </div>

        {/* Responsible Person for Media State Treaty */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Verantwortliche Person gemäß § 18 Abs. 2 MStV' : 'Responsible Person according to § 18 Abs. 2 MStV'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>Ole Oskar Heinrichs</p>
            <p>{language === 'de' ? 'Anschrift wie oben' : 'Address as above'}</p>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Streitschlichtung' : 'Dispute Resolution'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de' 
                ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Meine E-Mail-Adresse finden Sie oben im Impressum. Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr. You can find my email address in the imprint above. I am not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </div>
        </div>

        {/* Liability for Content */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Haftung für Inhalte' : 'Liability for Content'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.'
                : 'As a service provider, I am responsible for my own content on these pages in accordance with general laws according to § 7 Para.1 TMG. According to §§ 8 to 10 TMG, however, as a service provider, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information according to general laws remain unaffected by this. However, liability in this regard is only possible from the time of knowledge of a specific legal violation. Upon becoming aware of corresponding legal violations, I will remove this content immediately.'}
            </p>
          </div>
        </div>

        {/* Liability for Links */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Haftung für Links' : 'Liability for Links'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.'
                : 'My offer contains links to external websites of third parties, the content of which I have no influence on. Therefore, I cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent content control of the linked pages is not reasonable without concrete evidence of a violation of law. Upon becoming aware of legal violations, I will remove such links immediately.'}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Urheberrecht' : 'Copyright'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.'
                : 'The content and works created by the site operator on these pages are subject to German copyright law. The reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform me accordingly. Upon becoming aware of legal violations, I will remove such content immediately.'}
            </p>
          </div>
        </div>

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
      <footer className="bg-accent-primary/30 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-dark-text/70">&copy; {new Date().getFullYear()} Ole Oskar Heinrichs. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}
