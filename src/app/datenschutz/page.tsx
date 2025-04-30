"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ImprintHeader from '@/components/ImprintHeader';

export default function Datenschutz() {
  const { language } = useLanguage();
  
  return (
    <div className="bg-warm-beige min-h-screen">
      <header>
        <ImprintHeader />
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-dark-text mb-8">
          {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </h1>
        
        {/* Responsible Person */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '1. Verantwortlicher' : '1. Data Controller'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>Ole Oskar Heinrichs</p>
            <p>Mendelstr. 3</p>
            <p>13187 Berlin</p>
            <p>{language === 'de' ? 'Deutschland' : 'Germany'}</p>
            <p>{language === 'de' ? 'E-Mail' : 'Email'}: <a href="mailto:ooh.oska@outlook.de" className="text-accent-tertiary hover:underline">ooh.oska@outlook.de</a></p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? 'Übersicht' : 'Overview'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Der Schutz Ihrer persönlichen Daten ist mir ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten auf meiner Website.'
                : 'The protection of your personal data is important to me. This privacy policy informs you about the type, scope, and purpose of the processing of personal data on my website.'}
            </p>
          </div>
        </div>

        {/* Hosting and Server Logs */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '2. Hosting und Server-Logs' : '2. Hosting and Server Logs'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <h3 className="font-semibold">
              {language === 'de' ? 'Art und Umfang der Verarbeitung' : 'Type and Scope of Processing'}
            </h3>
            <p>
              {language === 'de'
                ? 'Beim Besuch meiner Website werden automatisch technische Informationen erhoben, darunter die IP-Adresse, Browsertyp, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners und Uhrzeit der Serveranfrage.'
                : 'When visiting my website, technical information is automatically collected, including the IP address, browser type, operating system used, referrer URL, hostname of the accessing computer, and time of the server request.'}
            </p>
            <h3 className="font-semibold mt-4">
              {language === 'de' ? 'Zweck und Rechtsgrundlage' : 'Purpose and Legal Basis'}
            </h3>
            <p>
              {language === 'de'
                ? 'Diese Daten werden zur Gewährleistung eines reibungslosen Verbindungsaufbaus, einer komfortablen Nutzung der Website, zur Auswertung der Systemsicherheit und -stabilität sowie zu weiteren administrativen Zwecken erhoben. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).'
                : 'This data is collected to ensure a smooth connection setup, comfortable use of the website, evaluation of system security and stability, and for other administrative purposes. The legal basis for this is Art. 6 para. 1 lit. f GDPR (legitimate interest).'}
            </p>
            <h3 className="font-semibold mt-4">
              {language === 'de' ? 'Speicherdauer' : 'Storage Duration'}
            </h3>
            <p>
              {language === 'de'
                ? 'Die Server-Logs werden aus Sicherheitsgründen (z.B. zur Aufklärung von Missbrauchs- oder Betrugshandlungen) für maximal 7 Tage gespeichert und dann gelöscht.'
                : 'The server logs are stored for security reasons (e.g., to clarify misuse or fraud) for a maximum of 7 days and then deleted.'}
            </p>
          </div>
        </div>

        {/* Cookies & Storage Technologies */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '3. Cookies und Speichertechnologien' : '3. Cookies and Storage Technologies'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Diese Website verwendet ausschließlich notwendige Cookies, die für die Funktionalität der Website erforderlich sind. Insbesondere wird ein Cookie gesetzt, um Ihre Spracheinstellung zu speichern. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).'
                : 'This website only uses necessary cookies that are required for the functionality of the website. In particular, a cookie is set to store your language setting. The legal basis for this is Art. 6 para. 1 lit. f GDPR (legitimate interest).'}
            </p>
            <p className="mt-4">
              {language === 'de'
                ? 'Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.'
                : 'You can set your browser to inform you about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate the automatic deletion of cookies when closing the browser. When deactivating cookies, the functionality of this website may be limited.'}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '4. Kontaktaufnahme' : '4. Contact'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <h3 className="font-semibold">
              {language === 'de' ? 'Art und Umfang der Verarbeitung' : 'Type and Scope of Processing'}
            </h3>
            <p>
              {language === 'de'
                ? 'Wenn Sie mit mir per E-Mail oder über ein Kontaktformular kommunizieren, werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer sowie sonstige übermittelte Informationen) gespeichert, um Ihre Anfrage zu beantworten.'
                : 'When you communicate with me via email or a contact form, the data you provide (your email address, possibly your name and telephone number, as well as other transmitted information) will be stored to answer your inquiry.'}
            </p>
            <h3 className="font-semibold mt-4">
              {language === 'de' ? 'Zweck und Rechtsgrundlage' : 'Purpose and Legal Basis'}
            </h3>
            <p>
              {language === 'de'
                ? 'Die Verarbeitung erfolgt zum Zweck der Kommunikation mit Ihnen. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen).'
                : 'The processing is carried out for the purpose of communicating with you. The legal basis for this is Art. 6 para. 1 lit. a GDPR (consent) and Art. 6 para. 1 lit. b GDPR (contract fulfillment or pre-contractual measures).'}
            </p>
            <h3 className="font-semibold mt-4">
              {language === 'de' ? 'Speicherdauer' : 'Storage Duration'}
            </h3>
            <p>
              {language === 'de'
                ? 'Ihre Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Wenn Sie einen Nutzungsvertrag mit mir abschließen, werden die Daten im Rahmen der gesetzlichen Aufbewahrungsfristen gespeichert.'
                : 'Your data will be deleted after the final processing of your request, unless there are legal retention obligations to the contrary. If you conclude a usage contract with me, the data will be stored within the framework of the legal retention periods.'}
            </p>
          </div>
        </div>

        {/* External Services and Content */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '5. Externe Dienste und Inhalte' : '5. External Services and Content'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <h3 className="font-semibold">
              {language === 'de' ? 'SoundCloud' : 'SoundCloud'}
            </h3>
            <p>
              {language === 'de'
                ? 'Auf meiner Website sind Inhalte des Musik-Streaming-Dienstes SoundCloud (SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin, Deutschland) eingebunden. Wenn Sie eine Seite mit entsprechenden Inhalten besuchen, wird eine Verbindung zu den SoundCloud-Servern hergestellt und die Inhalte auf der Website dargestellt. Dabei werden Ihre IP-Adresse und Informationen zu den von Ihnen besuchten Seiten an SoundCloud übermittelt.'
                : 'Content from the music streaming service SoundCloud (SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin, Germany) is integrated on my website. If you visit a page with corresponding content, a connection to the SoundCloud servers is established and the content is displayed on the website. In the process, your IP address and information about the pages you visited will be transmitted to SoundCloud.'}
            </p>
            <p className="mt-2">
              {language === 'de'
                ? 'Wenn Sie bei SoundCloud eingeloggt sind, können diese Informationen direkt Ihrem Konto zugeordnet werden. Wenn Sie dies nicht wünschen, müssen Sie sich vor der Nutzung meiner Website bei SoundCloud ausloggen.'
                : 'If you are logged in to SoundCloud, this information can be directly associated with your account. If you do not want this, you must log out of SoundCloud before using my website.'}
            </p>
            <p className="mt-2">
              {language === 'de'
                ? 'Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden Darstellung meines musikalischen Portfolios). Weitere Informationen zur Datenverarbeitung durch SoundCloud finden Sie in der Datenschutzerklärung von SoundCloud unter: https://soundcloud.com/pages/privacy'
                : 'The use is based on Art. 6 para. 1 lit. f GDPR (legitimate interest in an appealing presentation of my musical portfolio). For more information about data processing by SoundCloud, please see SoundCloud\'s privacy policy at: https://soundcloud.com/pages/privacy'}
            </p>
          </div>
        </div>

        {/* Data Subject Rights */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '6. Rechte der betroffenen Person' : '6. Rights of the Data Subject'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Ihnen stehen folgende Rechte gegenüber mir zu:'
                : 'You have the following rights towards me:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                {language === 'de'
                  ? 'Recht auf Auskunft (Art. 15 DSGVO)'
                  : 'Right to information (Art. 15 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Berichtigung (Art. 16 DSGVO)'
                  : 'Right to rectification (Art. 16 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Löschung (Art. 17 DSGVO)'
                  : 'Right to erasure (Art. 17 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)'
                  : 'Right to restriction of processing (Art. 18 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)'
                  : 'Right to data portability (Art. 20 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Widerspruch (Art. 21 DSGVO)'
                  : 'Right to object (Art. 21 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)'
                  : 'Right to withdraw given consent (Art. 7 para. 3 GDPR)'}
              </li>
              <li>
                {language === 'de'
                  ? 'Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)'
                  : 'Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)'}
              </li>
            </ul>
          </div>
        </div>

        {/* Supervisory Authority */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '7. Beschwerderecht bei einer Aufsichtsbehörde' : '7. Right to Complain to a Supervisory Authority'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt.'
                : 'According to Art. 77 GDPR, you have the right to complain to a supervisory authority if you believe that the processing of your personal data is not lawful.'}
            </p>
            <p className="mt-2">
              {language === 'de'
                ? 'Die für mich zuständige Aufsichtsbehörde ist: Berliner Beauftragte für Datenschutz und Informationsfreiheit, Friedrichstr. 219, 10969 Berlin, Deutschland, E-Mail: mailbox@datenschutz-berlin.de'
                : 'The supervisory authority responsible for me is: Berlin Commissioner for Data Protection and Freedom of Information, Friedrichstr. 219, 10969 Berlin, Germany, Email: mailbox@datenschutz-berlin.de'}
            </p>
          </div>
        </div>

        {/* Changes to the Privacy Policy */}
        <div className="bg-accent-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-text">
            {language === 'de' ? '8. Änderung dieser Datenschutzerklärung' : '8. Changes to this Privacy Policy'}
          </h2>
          <div className="space-y-2 text-dark-text/80">
            <p>
              {language === 'de'
                ? 'Ich behalte mir das Recht vor, diese Datenschutzerklärung unter Beachtung der geltenden Datenschutzvorschriften zu ändern. Die aktuelle Fassung finden Sie jeweils an dieser Stelle.'
                : 'I reserve the right to change this privacy policy in compliance with applicable data protection regulations. You will always find the current version at this location.'}
            </p>
            <p className="mt-2">
              {language === 'de'
                ? 'Stand: 30. April 2025'
                : 'Last updated: April 30, 2025'}
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
