# Task Manager

A modern task management application built with Next.js, Better Auth, MongoDB, Zustand, and shadcn-style UI components.

## Features

- User authentication with login and signup
- Protected dashboard for authenticated users
- Create, edit, delete, and manage tasks
- Responsive shadcn-style data table
- MongoDB-backed persistence
- Zustand-based state management

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn UI
- Better Auth
- MongoDB
- Zustand

## Prerequisites

- Node.js 18+
- npm or pnpm
- MongoDB connection string

## Installation

1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd Nextjs_Task
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root folder and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
