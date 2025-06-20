"use client";

import { useLanguage } from '@/context/LanguageContext';
import LegalPageHeader from '@/components/LegalPageHeader';
import Footer from '@/components/Footer';
import SEOEnhancer from '@/components/SEOEnhancer';

export default function AGB() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEOEnhancer />
      
      {/* Legal Page Header */}
      <LegalPageHeader />
      
      <main className="pt-20 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-12">
          {language === 'de' ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions'}
        </h1>
        
        {/* Scope of Application */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '1. Geltungsbereich' : '1. Scope of Application'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Ole Oskar Heinrichs und seinen Kunden bezüglich der Erbringung von Dienstleistungen im Bereich Musikproduktion, Marketing und verwandter Services.'
                : 'These General Terms and Conditions (GTC) apply to all contracts between Ole Oskar Heinrichs and his clients regarding the provision of services in the field of music production, marketing and related services.'}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '2. Leistungen' : '2. Services'}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Musikproduktion' : 'Music Production'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Erstellung von Musikstücken, Beats, Arrangements und Produktionen nach individueller Absprache. Die Leistungen umfassen Komposition, Arrangement, Aufnahme, Mixing und Mastering.'
                  : 'Creation of musical pieces, beats, arrangements and productions according to individual agreement. Services include composition, arrangement, recording, mixing and mastering.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Marketing Services' : 'Marketing Services'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Beratung und Umsetzung von Marketingstrategien für Musiker und Künstler, einschließlich Social Media Management, Kampagnenentwicklung und Markenaufbau.'
                  : 'Consulting and implementation of marketing strategies for musicians and artists, including social media management, campaign development and brand building.'}
              </p>
            </div>
          </div>
        </section>

        {/* Contract Formation */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '3. Vertragsschluss' : '3. Contract Formation'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Verträge kommen durch schriftliche Vereinbarung (E-Mail genügt) oder durch Auftragsbestätigung zustande. Alle Angebote sind freibleibend und unverbindlich, sofern nicht ausdrücklich als verbindlich bezeichnet.'
                : 'Contracts are concluded through written agreement (email is sufficient) or through order confirmation. All offers are subject to change and non-binding unless expressly designated as binding.'}
            </p>
          </div>
        </section>

        {/* Fees and Payment */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '4. Honorare und Zahlung' : '4. Fees and Payment'}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Honorarvereinbarung' : 'Fee Agreement'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Die Höhe der Vergütung wird individuell vereinbart und richtet sich nach Art und Umfang der zu erbringenden Leistung. Alle Preise verstehen sich als Nettopreise zuzüglich der gesetzlichen Mehrwertsteuer.'
                  : 'The amount of remuneration is individually agreed and depends on the type and scope of the service to be provided. All prices are net prices plus statutory VAT.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Zahlungsbedingungen' : 'Payment Terms'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet.'
                  : 'Invoices are due for payment within 14 days of invoicing without deduction. In case of payment delay, default interest of 9 percentage points above the base rate will be charged.'}
              </p>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '5. Urheberrecht und Nutzungsrechte' : '5. Copyright and Usage Rights'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed mb-4">
              {language === 'de'
                ? 'Alle erstellten Werke unterliegen dem Urheberrecht. Die Übertragung von Nutzungsrechten erfolgt erst nach vollständiger Bezahlung der vereinbarten Vergütung.'
                : 'All created works are subject to copyright. The transfer of usage rights takes place only after full payment of the agreed remuneration.'}
            </p>
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Der Umfang der übertragenen Nutzungsrechte wird im jeweiligen Vertrag spezifiziert. Ohne ausdrückliche Vereinbarung werden nur einfache Nutzungsrechte übertragen.'
                : 'The scope of transferred usage rights is specified in the respective contract. Without express agreement, only simple usage rights are transferred.'}
            </p>
          </div>
        </section>

        {/* Liability */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '6. Haftung' : '6. Liability'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Die Haftung für Schäden ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt.'
                : 'Liability for damages is limited to intent and gross negligence. In case of slightly negligent breach of essential contractual obligations, liability is limited to foreseeable, contract-typical damage.'}
            </p>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '7. Datenschutz' : '7. Data Protection'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Der Schutz personenbezogener Daten erfolgt gemäß der Datenschutz-Grundverordnung (DSGVO). Weitere Informationen finden Sie in der Datenschutzerklärung.'
                : 'The protection of personal data is carried out in accordance with the General Data Protection Regulation (GDPR). For more information, please see the privacy policy.'}
            </p>
          </div>
        </section>

        {/* Final Provisions */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '8. Schlussbestimmungen' : '8. Final Provisions'}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Anwendbares Recht' : 'Applicable Law'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.'
                  : 'The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Salvatorische Klausel' : 'Severability Clause'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt dies nicht die Wirksamkeit der übrigen Bestimmungen.'
                  : 'Should individual provisions of these GTC be or become invalid, this does not affect the validity of the remaining provisions.'}
              </p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500">
            {language === 'de'
              ? `Stand: ${new Date().toLocaleDateString('de-DE')}`
              : `Last updated: ${new Date().toLocaleDateString('en-US')}`}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
