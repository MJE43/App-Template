# Progressio: Project Structure

```
src/
├── actions/                    # Server actions
│   ├── db/                    # Database-related actions
│   │   ├── progressions.ts    # CRUD operations for progressions
│   │   ├── contexts.ts        # CRUD operations for musical contexts
│   │   └── messages.ts        # CRUD operations for chat messages
│   └── claude-actions.ts      # Claude API integration actions
│
├── app/                       # Next.js app router
│   ├── (auth)/               # Auth-related routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── api/                  # API routes
│   │   ├── claude/
│   │   └── webhooks/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── (main)/               # Main application routes
│       ├── progression/      # Progression workspace route
│       │   ├── _components/  # Route-specific components
│       │   ├── layout.tsx
│       │   └── page.tsx
│       └── settings/         # User settings route
│           ├── _components/
│           ├── layout.tsx
│           └── page.tsx
│
├── components/               # Shared components
│   ├── progression/         # Timeline and chord bank components
│   │   ├── timeline/
│   │   │   ├── timeline.tsx
│   │   │   ├── chord-block.tsx
│   │   │   └── measure-grid.tsx
│   │   ├── chord-bank/
│   │   │   ├── chord-bank.tsx
│   │   │   ├── chord-button.tsx
│   │   │   └── chord-variants.tsx
│   │   └── controls/
│   │       ├── playback-controls.tsx
│   │       └── transport-controls.tsx
│   ├── chat/               # Claude chat interface components
│   │   ├── chat-interface.tsx
│   │   ├── message-list.tsx
│   │   ├── message-input.tsx
│   │   └── suggestion-card.tsx
│   ├── audio/             # Audio playback components
│   │   ├── audio-engine.tsx
│   │   ├── chord-preview.tsx
│   │   └── volume-control.tsx
│   ├── context/          # Context selection components
│   │   ├── genre-select.tsx
│   │   └── era-select.tsx
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── [other-ui-components].tsx
│   └── utilities/       # Utility components
│       ├── loading.tsx
│       └── error.tsx
│
├── db/                  # Database configuration
│   ├── db.ts           # Database connection
│   └── schema/         # Database schemas
│       ├── index.ts    # Schema exports
│       ├── progressions-schema.ts
│       ├── chords-schema.ts
│       ├── contexts-schema.ts
│       └── messages-schema.ts
│
├── lib/                # Library code
│   ├── hooks/         # Custom hooks
│   │   ├── use-audio.ts
│   │   ├── use-progression.ts
│   │   └── use-chat.ts
│   ├── audio/        # Audio synthesis and playback
│   │   ├── engine.ts
│   │   ├── chords.ts
│   │   └── utils.ts
│   ├── claude/       # Claude API integration
│   │   ├── client.ts
│   │   └── prompts.ts
│   ├── chord-utils/  # Chord processing utilities
│   │   ├── parser.ts
│   │   └── validator.ts
│   └── utils/       # General utilities
│       ├── api.ts
│       └── format.ts
│
├── prompts/          # Claude prompt templates
│   ├── base.txt
│   ├── context.txt
│   └── suggestions.txt
│
├── public/          # Static assets
│   ├── fonts/
│   └── images/
│
├── styles/         # Global styles
│   └── globals.css
│
├── types/          # TypeScript types
│   ├── index.ts
│   ├── progression-types.ts
│   ├── chat-types.ts
│   └── audio-types.ts
│
├── middleware.ts   # Next.js middleware
├── env.mjs        # Environment variables validation
└── tailwind.config.ts
```

## Key Directories and Files

### Actions (`/actions`)
Server-side actions for data mutations and API integrations. Includes database operations and Claude API interactions.

### App Router (`/app`)
Next.js app router structure with auth routes, API endpoints, and main application routes.

### Components (`/components`)
Organized into feature-specific directories:
- `progression/`: Timeline and chord bank components
- `chat/`: Claude chat interface components
- `audio/`: Audio playback components
- `ui/`: shadcn/ui components
- `utilities/`: Shared utility components

### Database (`/db`)
Database configuration and schemas for all data models.

### Library (`/lib`)
Core business logic, hooks, and utilities:
- `hooks/`: Custom React hooks
- `audio/`: Tone.js integration
- `claude/`: Claude API client
- `chord-utils/`: Chord processing utilities

### Prompts (`/prompts`)
Claude prompt templates for different interaction contexts.

### Types (`/types`)
TypeScript type definitions for all features.

## Key Files

### Configuration Files
- `tailwind.config.ts`: Tailwind CSS configuration
- `env.mjs`: Environment variable validation
- `middleware.ts`: Next.js middleware configuration

### Core Components
- `components/progression/timeline/timeline.tsx`: Main progression timeline
- `components/chat/chat-interface.tsx`: Claude chat interface
- `components/audio/audio-engine.tsx`: Tone.js audio engine wrapper

### Database Schemas
- `db/schema/progressions-schema.ts`: Progression data model
- `db/schema/contexts-schema.ts`: Musical context data model
- `db/schema/messages-schema.ts`: Chat history data model

### Server Actions
- `actions/db/progressions.ts`: Progression CRUD operations
- `actions/claude-actions.ts`: Claude API integration actions

## Style Guidelines

- All component files use kebab-case
- Each component has its own directory for related files
- Server components marked with "use server"
- Client components marked with "use client"
- Type definitions centralized in `/types`
- Database schemas in `/db/schema`
- Custom hooks in `/lib/hooks`