import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Ole Oskar Heinrichs',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="bg-warm-beige min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-dark-text">404</h1>
        <h2 className="text-2xl font-medium text-dark-text">Page Not Found</h2>
        <p className="text-dark-text/80">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link 
            href="/" 
            className="inline-block bg-accent-primary/20 hover:bg-accent-primary/30 text-dark-text px-6 py-3 rounded-lg transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
