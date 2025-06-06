# Backend Setup Guide

This guide covers the enhanced backend features and setup for the portfolio website.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   npm run setup:env
   # Edit .env.local with your API keys
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Test Backend APIs**
   ```bash
   npm run test:api
   ```

## 📧 Email Service Configuration

The backend supports two email providers with automatic fallback:

### Resend (Primary)
```env
RESEND_API_KEY=your_resend_api_key
```

### SendGrid (Fallback)
```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender@domain.com
SENDGRID_TO_EMAIL=your_contact_email@domain.com
```

## 🎵 Spotify Integration

For real artist statistics, configure Spotify API:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

**How to get Spotify credentials:**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy Client ID and Client Secret
4. Add to your `.env.local` file

## 🔧 API Endpoints

### Contact Form (`/api/contact`)
- **POST**: Submit contact form with email notifications
- **GET**: Health check for email service
- Features: Spam detection, rate limiting, auto-reply emails

### Artist Statistics (`/api/artist-stats`)
- **GET**: Fetch real-time Spotify artist data
- **POST**: Health check for Spotify API connection
- Features: Caching, fallback to mock data

### Analytics (`/api/analytics`)
- **POST**: Track page views and custom events
- **GET**: Retrieve analytics data with filtering
- Features: Rate limiting, in-memory storage

### Health Check (`/api/health`)
- **GET**: System health and service status
- Features: Environment validation, performance metrics

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Testing
npm run test:api        # Test all API endpoints
npm run test:health     # Test health endpoint
npm run test:contact    # Test contact form
npm run test:stats      # Test artist stats

# Maintenance
npm run health          # Check system health (with jq formatting)
npm run check:deps      # Audit dependencies
npm run clean           # Clean build and rebuild
npm run setup:env       # Copy environment template
```

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Zod schema validation
- **Spam Detection**: Keyword filtering and honeypot
- **CORS Protection**: Configured in next.config.js
- **Environment Validation**: Runtime checks for required variables

## 📊 Performance Features

- **Caching**: Server-side caching with TTL
- **Error Handling**: Centralized error management
- **Health Monitoring**: Real-time system status
- **Analytics**: Custom event tracking

## 🐛 Troubleshooting

### Email Not Sending
1. Check API keys in `.env.local`
2. Verify sender email is verified with your provider
3. Check health endpoint: `npm run test:health`

### Spotify Data Not Loading
1. Ensure Spotify credentials are correct
2. Check artist ID in `/api/artist-stats/route.ts`
3. Verify API connection: `curl -X POST http://localhost:3000/api/artist-stats`

### Build Errors
1. Run dependency check: `npm run check:deps`
2. Clean and rebuild: `npm run clean`
3. Check TypeScript errors: `npm run lint`

## 🚀 Production Deployment

1. **Environment Variables**: Set all required env vars in your hosting platform
2. **Email Service**: Configure at least one email provider
3. **Monitoring**: Use the health endpoint for uptime monitoring
4. **Analytics**: Consider upgrading to a database for analytics storage

## 📝 Next Steps

- [ ] Add database integration for contact form submissions
- [ ] Implement user authentication for admin dashboard
- [ ] Add automated backups for analytics data
- [ ] Integrate with monitoring services (Sentry, DataDog)
- [ ] Add automated testing suite
- [ ] Implement dynamic sitemap generation

## 🤝 Contributing

When adding new API endpoints:
1. Add proper validation schemas
2. Implement rate limiting
3. Add error handling
4. Update health check endpoint
5. Add tests to package.json scripts

---

For questions or issues, check the health endpoint at `/api/health` for system status.
