# Social Media Marketplace Application

## Overview

This is a full-stack social media marketplace application built with React, Express, TypeScript, and in-memory storage. The application provides a platform for users to buy and sell social media accounts (Instagram, Twitter, Facebook, TikTok, YouTube) with advanced filtering, sorting, and search capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Custom component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system (shadcn/ui style)
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful API with `/api` prefix
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Development**: Custom middleware for request logging and error handling

## Key Components

### Frontend Components
- **Layout Components**: Header with social media branding, HeroSection for social media accounts
- **Social Media Components**: SocialMediaAccountCard, SocialMediaAccountGrid with real API data
- **Filter Components**: FiltersAndSort with platform, price, followers filtering, CategoryNav with social media categories
- **UI Components**: Complete shadcn/ui component library (buttons, forms, dialogs, sheets, etc.)
- **Pages**: Index (social media marketplace), NotFound (404 handling)

### Backend Components
- **Server**: Express application with middleware setup
- **Routes**: Complete API routes for social media accounts (GET, POST, PUT, DELETE) with filtering and sorting
- **Storage**: Abstracted storage interface with in-memory implementation including mock social media account data
- **Database Schema**: Users and social media accounts with comprehensive fields (platform, followers, engagement, price, etc.)

### Shared Components
- **Schema**: Drizzle schema definitions for social media accounts with Zod validation
- **Types**: Shared TypeScript interfaces for social media accounts between client and server

## Data Flow

### Current Implementation
1. **Frontend**: React components render social media marketplace UI with real API data
2. **API Layer**: Express server with complete CRUD routes for social media accounts (`/api/accounts`)
3. **Storage Layer**: In-memory storage implementation with mock social media account data
4. **Filtering**: Advanced client and server-side filtering by platform, category, price, followers
5. **Search**: Real-time search functionality across account handles and descriptions

### Features Implemented
1. Social media account listings with platform icons (Instagram, Twitter, Facebook, TikTok, YouTube)
2. Advanced filtering by platform, category, minimum followers, maximum price
3. Sorting by price, followers, engagement rate, date listed
4. Real-time search across account handles and descriptions
5. Responsive grid layout with loading states and error handling
6. Professional account cards showing followers, engagement, price, verification status

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Frontend build tool with React plugin
- **tsx**: TypeScript execution for development
- **esbuild**: Server-side bundling for production

### UI/UX Dependencies
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management
- **tailwind-merge & clsx**: CSS class utility functions

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations ready for deployment

### Environment Configuration
- **Development**: Uses tsx for server, Vite dev server for client
- **Production**: Node.js serves bundled Express app with static file serving
- **Database**: Configured for Neon PostgreSQL with environment-based connection

### Current Status
- **Completed**: Full social media marketplace with functional filtering, sorting, and search
- **Backend**: Complete API implementation with CRUD operations for social media accounts
- **Frontend**: Professional UI with account cards, filters, and responsive design
- **Storage**: In-memory implementation with realistic mock data for 6 different social media accounts
- **Ready for**: User authentication, payment processing, account verification, and database migration

## Recent Changes (July 2025)
- **Successfully migrated** from Replit Agent to standard Replit environment
- **Completely redesigned UI** to match AcctBazaar marketplace style with clean, professional layout
- **Recreated sidebar filter section** with collapsible categories, proper icons, and fixed positioning with scrollable content
- **Implemented comprehensive category structure** including Social Media, Emails & Messaging, Giftcards, VPN & Proxies, etc.
- **Enhanced price range functionality** with dual slider controls and synchronized input fields
- **Added "Add to Cart" buttons** to horizontal account cards with loading states and toast notifications  
- **Updated header design** with AcctBazaar branding, navigation tabs, and integrated search functionality
- **Created professional account cards** with platform icons, seller ratings, and instant delivery badges
- **Maintained client/server separation** and robust security practices throughout migration
- **Ensured full responsiveness** across desktop and mobile with proper sticky positioning and scrollable content areas

The application now provides a complete AcctBazaar-style marketplace experience with professional design, functional filtering system, and responsive layout matching the target specification exactly.