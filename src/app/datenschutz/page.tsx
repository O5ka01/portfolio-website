"use client";

import { useLanguage } from '@/context/LanguageContext';
import LegalPageHeader from '@/components/LegalPageHeader';
import Footer from '@/components/Footer';
import SEOEnhancer from '@/components/SEOEnhancer';

export default function Datenschutz() {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SEOEnhancer />
      
      {/* Legal Page Header */}
      <LegalPageHeader />
      
      <main className="pt-20 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-12">
          {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </h1>
        
        {/* Responsible Person */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '1. Verantwortlicher' : '1. Data Controller'}
          </h2>
          <div className="bg-neutral-50 rounded-lg p-6 space-y-1 text-neutral-700">
            <p>Ole Oskar Heinrichs</p>
            <p>Mendelstr. 3</p>
            <p>13187 Berlin</p>
            <p>{language === 'de' ? 'Deutschland' : 'Germany'}</p>
            <p className="pt-2">
              {language === 'de' ? 'E-Mail' : 'Email'}: 
              <a 
                href="mailto:ooh.oska@outlook.de" 
                className="ml-1 text-neutral-900 border-b border-neutral-400 hover:border-neutral-900 transition-colors"
              >
                ooh.oska@outlook.de
              </a>
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '2. Übersicht' : '2. Overview'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Der Schutz Ihrer persönlichen Daten ist mir ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten auf meiner Website.'
                : 'The protection of your personal data is important to me. This privacy policy informs you about the type, scope, and purpose of the processing of personal data on my website.'}
            </p>
          </div>
        </section>

        {/* Hosting and Server Logs */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '3. Hosting und Server-Logs' : '3. Hosting and Server Logs'}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Art und Umfang der Verarbeitung' : 'Type and Scope of Processing'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Beim Besuch meiner Website werden automatisch technische Informationen erhoben, darunter die IP-Adresse, Browsertyp, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners und Uhrzeit der Serveranfrage.'
                  : 'When visiting my website, technical information is automatically collected, including the IP address, browser type, operating system used, referrer URL, hostname of the accessing computer, and time of the server request.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Zweck und Rechtsgrundlage' : 'Purpose and Legal Basis'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Diese Daten werden zur Gewährleistung eines reibungslosen Verbindungsaufbaus, einer komfortablen Nutzung der Website, zur Auswertung der Systemsicherheit und -stabilität sowie zu weiteren administrativen Zwecken erhoben. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).'
                  : 'This data is collected to ensure a smooth connection setup, comfortable use of the website, evaluation of system security and stability, and for other administrative purposes. The legal basis for this is Art. 6 para. 1 lit. f GDPR (legitimate interest).'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Speicherdauer' : 'Storage Duration'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Die Server-Logs werden aus Sicherheitsgründen (z.B. zur Aufklärung von Missbrauchs- oder Betrugshandlungen) für maximal 7 Tage gespeichert und dann gelöscht.'
                  : 'The server logs are stored for security reasons (e.g., to clarify misuse or fraud) for a maximum of 7 days and then deleted.'}
              </p>
            </div>
          </div>
        </section>

        {/* Cookies & Storage Technologies */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '4. Cookies und Speichertechnologien' : '4. Cookies and Storage Technologies'}
          </h2>
          <div className="prose prose-neutral max-w-none space-y-4">
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Diese Website verwendet ausschließlich notwendige Cookies, die für die Funktionalität der Website erforderlich sind. Insbesondere wird ein Cookie gesetzt, um Ihre Spracheinstellung zu speichern. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).'
                : 'This website only uses necessary cookies that are required for the functionality of the website. In particular, a cookie is set to store your language setting. The legal basis for this is Art. 6 para. 1 lit. f GDPR (legitimate interest).'}
            </p>
            <p className="text-neutral-700 leading-relaxed">
              {language === 'de'
                ? 'Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.'
                : 'You can set your browser to inform you about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate the automatic deletion of cookies when closing the browser. When deactivating cookies, the functionality of this website may be limited.'}
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '5. Kontaktformular' : '5. Contact Form'}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Art und Umfang der Verarbeitung' : 'Type and Scope of Processing'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Bei der Nutzung des Kontaktformulars erheben wir die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage.'
                  : 'When using the contact form, we collect the data you enter (name, email address, message) to process your inquiry.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-normal mb-3 text-neutral-900">
                {language === 'de' ? 'Zweck und Rechtsgrundlage' : 'Purpose and Legal Basis'}
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {language === 'de'
                  ? 'Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).'
                  : 'Processing is carried out to handle your inquiry based on Art. 6 para. 1 lit. b GDPR (contract initiation) or Art. 6 para. 1 lit. f GDPR (legitimate interest).'}
              </p>
            </div>
          </div>
        </section>

        {/* Rights */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6 text-neutral-900">
            {language === 'de' ? '6. Ihre Rechte' : '6. Your Rights'}
          </h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed mb-4">
              {language === 'de'
                ? 'Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:'
                : 'You have the following rights regarding your personal data:'}
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <span className="text-neutral-400 mr-3">•</span>
                {language === 'de' ? 'Recht auf Auskunft (Art. 15 DSGVO)' : 'Right to information (Art. 15 GDPR)'}
              </li>
              <li className="flex items-start">
                <span className="text-neutral-400 mr-3">•</span>
                {language === 'de' ? 'Recht auf Berichtigung (Art. 16 DSGVO)' : 'Right to rectification (Art. 16 GDPR)'}
              </li>
              <li className="flex items-start">
                <span className="text-neutral-400 mr-3">•</span>
                {language === 'de' ? 'Recht auf Löschung (Art. 17 DSGVO)' : 'Right to erasure (Art. 17 GDPR)'}
              </li>
              <li className="flex items-start">
                <span className="text-neutral-400 mr-3">•</span>
                {language === 'de' ? 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)' : 'Right to restriction of processing (Art. 18 GDPR)'}
              </li>
              <li className="flex items-start">
                <span className="text-neutral-400 mr-3">•</span>
                {language === 'de' ? 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)' : 'Right to data portability (Art. 20 GDPR)'}
              </li>
              <li className="flex items-start">
                <span className="text-neutral-400 mr-3">•</span>
                {language === 'de' ? 'Widerspruchsrecht (Art. 21 DSGVO)' : 'Right to object (Art. 21 GDPR)'}
              </li>
            </ul>
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
