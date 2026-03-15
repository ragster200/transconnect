# TransConnect

Transport Industry Platform - Jobs, Backloads, Equipment, Directory, AI Search

## Features

- **Jobs Board** - Driver jobs and operator hiring
- **Backloads** - Find return freight for empty runs
- **Equipment** - Buy/sell trucks, trailers, parts
- **Directory** - Operator directory by route/zone
- **AI Search** - Natural language search powered by Ollama GLM-5

## Tech Stack

- **Frontend**: Expo (React Native) + TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Ollama GLM-5 (LanceDB for embeddings)
- **Hosting**: Railway

## Getting Started

```bash
cd mobile
npm install
npm start
```

## Environment Setup

Copy `.env.example` to `.env` and add your Supabase credentials.

## Architecture

```
TransConnect/
├── mobile/           # Expo React Native app
│   ├── src/
│   │   ├── config/   # Environment config
│   │   ├── lib/      # Supabase client
│   │   ├── screens/  # Screen components
│   │   ├── components/ # Reusable components
│   │   └── navigation/ # App navigation
│   └── App.tsx
├── schema.sql        # Database schema for Supabase
└── README.md
```

## Database Schema

Run `schema.sql` in Supabase SQL Editor to create:
- `profiles` - User profiles
- `posts` - Jobs, backloads, equipment, directory entries
- `post_embeddings` - Vector embeddings for AI search

## License

MIT