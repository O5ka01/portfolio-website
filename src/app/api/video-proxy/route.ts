import { NextRequest, NextResponse } from 'next/server';

/**
 * Video proxy API that fetches videos from Cloudinary and serves them through our own domain
 * This bypasses Cross-Origin issues and Content Security Policy restrictions
 */
export async function GET(request: NextRequest) {
  // Get the video URL from the query parameters
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');

  // Validate the URL - only allow Cloudinary URLs for security
  if (!videoUrl || !videoUrl.startsWith('https://res.cloudinary.com/')) {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  try {
    // Create an HTML page with embedded video that autoplays and loops
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background-color: #000;
            }
            video {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          </style>
        </head>
        <body>
          <video autoplay loop muted playsinline disablepictureinpicture>
            <source src="${videoUrl}" type="video/mp4">
          </video>
          <script>
            // Ensure video autoplays
            document.addEventListener('DOMContentLoaded', function() {
              const video = document.querySelector('video');
              
              // Play the video immediately and handle any errors
              video.play().catch(function(error) {
                console.error('Autoplay failed:', error);
                
                // Try again after a user interaction
                document.addEventListener('click', function() {
                  video.play();
                }, { once: true });
              });
              
              // Force restart when it ends (for better looping)
              video.addEventListener('ended', function() {
                video.currentTime = 0;
                video.play();
              });
            });
          </script>
        </body>
      </html>
    `;

    // Return the HTML with appropriate headers
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error proxying video:', error);
    return new NextResponse('Error fetching video', { status: 500 });
  }
}
