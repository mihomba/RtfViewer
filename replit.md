# Overview

This is a TVSDAC (church branch) quarterly reporting system built as a full-stack web application. The system allows church leaders to create, edit, and manage detailed quarterly reports covering various aspects of church operations including membership statistics, youth programs, divine services, financial offerings, and leadership information. The application features a modern React frontend with a comprehensive form-based interface and uses Firebase for data storage and file management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Form Management**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Server**: Express.js with TypeScript in ESM format
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Data Storage**: Dual storage strategy with in-memory storage for development and PostgreSQL for production
- **File Handling**: Firebase Storage for photo uploads and management
- **Session Management**: Express sessions with PostgreSQL session store

## Component Structure
- **Modular Report Sections**: Each report section (general info, membership, youth programs, etc.) is a separate component
- **Shared UI Components**: Comprehensive set of reusable UI components following a consistent design system
- **Form Validation**: Centralized schema definitions in shared directory for type safety across frontend and backend
- **Photo Management**: Dedicated photo upload component with Firebase integration

## Data Layer
- **Schema Design**: Comprehensive Zod schemas defining report structure with nested objects for different sections
- **Type Safety**: Shared TypeScript types generated from Zod schemas ensure consistency between client and server
- **Validation**: Client-side and server-side validation using the same schema definitions
- **Auto-save**: Implemented auto-save functionality to prevent data loss during form completion

## Development Environment
- **Replit Integration**: Configured for Replit development environment with specialized plugins
- **Hot Reload**: Vite HMR for instant development feedback
- **Database Migrations**: Drizzle Kit for database schema management and migrations
- **TypeScript**: Strict TypeScript configuration with path mapping for clean imports

# External Dependencies

## Database Services
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connection Pooling**: @neondatabase/serverless for optimized database connections

## Firebase Services
- **Firestore**: Document database for report data storage
- **Firebase Storage**: Cloud storage for photo uploads and file management
- **Firebase Auth**: Authentication system (configured but not actively used in current implementation)

## UI and Styling
- **Radix UI**: Headless UI components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

## Development Tools
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting utilities
- **Embla Carousel**: Touch-friendly carousel component for photo galleries

## Build and Development
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TSX**: TypeScript execution for development server