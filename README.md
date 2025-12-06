# 🚀 Task Management App - Frontend

A modern, production-ready task management application built with Next.js 14 and TypeScript. Features real-time search, advanced filtering, dark mode, and seamless authentication.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with httpOnly cookies
- 📝 **Task Management** - Create, edit, delete, and organize tasks
- 🔍 **Smart Search** - Real-time search with highlighted matches
- 🎨 **Advanced Filters** - Filter by priority, status, and due date
- 🌓 **Dark Mode** - System-aware theme with manual toggle
- ⚡ **Optimistic Updates** - Instant UI feedback with React Query
- ⌨️ **Keyboard Shortcuts** - Productivity shortcuts (Cmd/Ctrl+N for new task)
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎯 **Type-Safe** - Full TypeScript coverage
- ♿ **Accessible** - ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Core
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[React 19](https://react.dev/)** - UI library

### State & Data
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Zod](https://zod.dev/)** - Schema validation

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icons
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Zod integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ImKartikey27/brew_frontend.git
cd brew_frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.crmint.tech/api/v1
```

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── tasks/            # Task-related components
│   └── ui/               # Shadcn/ui components
├── lib/                   # Utilities
│   ├── api/              # API client & endpoints
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   └── validations/      # Zod schemas
├── types/                 # TypeScript types
└── middleware.ts          # Next.js middleware
```

## 🎯 Key Features Explained

### Authentication Flow
- JWT tokens stored in httpOnly cookies (secure)
- Automatic token refresh on expiration
- Protected routes with middleware
- Persistent sessions across page reloads

### Task Management
- CRUD operations with optimistic updates
- Real-time search with debouncing
- Advanced filtering (priority, status, due date)
- Keyboard shortcuts for power users

### Performance
- Server-side rendering (SSR)
- React Query caching & background refetching
- Code splitting & lazy loading
- Optimized images with Next.js Image

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy via Vercel Dashboard or CLI
vercel --prod
```

The app is automatically deployed on every push to `main`.

**Live Demo:** [https://www.crmint.tech](https://www.crmint.tech)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- **Frontend:** [https://www.crmint.tech](https://www.crmint.tech)
- **API:** [https://api.crmint.tech](https://api.crmint.tech)
- **Backend Repo:** [https://github.com/ImKartikey27/brew](https://github.com/ImKartikey27/brew)

---

**Built with ❤️ using Next.js & TypeScript**
