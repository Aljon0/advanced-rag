# Advanced RAG Frontend

Frontend application for an Advanced Retrieval-Augmented Generation (RAG) system.
It provides a UI for uploading PDFs, asking grounded questions, viewing citations, and managing indexed documents.

## Features

- Dashboard with knowledge base stats and recent activity
- PDF upload flow with progress tracking and file validation
- Multi-turn AI chat with session persistence and citations
- Documents management view with refresh and delete support
- Centralized API service layer with normalized error handling

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Axios
- Lucide React

## App Routes

- `/dashboard`: system overview (document count, chunks, confidence, activity)
- `/upload`: upload one or more PDF files (up to 10 files, 50 MB each)
- `/chat`: ask questions against your indexed knowledge base
- `/documents`: list and delete uploaded documents

The root route (`/`) redirects to `/dashboard`.

## Backend API Contract

The frontend expects a backend API with these endpoints:

- `POST /documents/upload` - upload a PDF file (`multipart/form-data`)
- `GET /documents` - list documents
- `DELETE /documents/:id` - delete one document
- `POST /chat/ask` - ask a question and receive answer plus citations
- `GET /dashboard/stats` - dashboard metrics and recent activity

Default API base URL:

- `http://localhost:3001/api`

Override using:

- `NEXT_PUBLIC_API_BASE_URL`

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### 3) Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run ESLint checks

## Project Structure

```text
app/                  # App Router pages
components/           # UI and feature components
hooks/                # Feature hooks (chat, upload, dashboard, documents)
services/             # API client and endpoint calls
types/                # Shared TypeScript models
lib/constants.ts      # App constants and limits
```

## Notes

- File uploads currently support PDF only.
- Upload limit is 10 files per batch.
- Max file size is 50 MB per file.
- Chat keeps `sessionId` for multi-turn context.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
