# SocialSync AI

Schedule social posts everywhere, effortlessly.

## Overview

SocialSync AI is an AI-powered web application that helps creators and businesses schedule and publish content across multiple social media platforms simultaneously. Built with React and modern web technologies.

## Features

- **Cross-Platform Publishing**: Schedule posts across Twitter, Facebook, Instagram, and LinkedIn from a single dashboard
- **AI Caption Assistant**: Generate optimized captions using OpenAI API with platform-specific best practices
- **Smart Scheduling**: Get AI-powered suggestions for optimal posting times
- **Calendar View**: Visualize your content schedule with an intuitive calendar interface
- **Content Management**: Create, edit, and manage your social media content queue

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Date Handling**: date-fns, react-datepicker
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **AI Integration**: OpenAI API
- **Social Media APIs**: Ayrshare (planned)
- **Authentication**: Supabase (planned)
- **Payments**: Stripe (planned)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Add your API keys to the `.env` file:
- OpenAI API key for AI features
- Supabase credentials for backend
- Ayrshare API key for social media posting
- Stripe keys for payments

4. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t socialsync-ai .

# Run the container
docker run -p 3000:3000 socialsync-ai
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout components (Navbar, etc.)
├── pages/              # Page components
├── stores/             # Zustand state stores
├── services/           # API services and utilities
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## Development Roadmap

### Phase 1: Core Features ✅
- User authentication and registration
- Post composer with platform selection
- Basic scheduling functionality
- Calendar view for content management
- AI caption assistant integration

### Phase 2: Social Media Integration
- Ayrshare API integration for actual posting
- OAuth flows for social platform connections
- Real-time post status updates
- Media upload support (images/videos)

### Phase 3: Advanced Features
- Analytics and performance tracking
- Team collaboration features
- Content curation feed
- Advanced scheduling algorithms
- Mobile app development

### Phase 4: Business Features
- Subscription management with Stripe
- Advanced analytics dashboard
- API access for enterprise users
- White-label solutions

## Docker Configuration

The application is configured for production deployment with:
- Multi-stage Docker build for optimized image size
- Non-root user for security
- Health checks for monitoring
- Proper caching layers for faster builds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@socialsync.ai or join our Discord community.