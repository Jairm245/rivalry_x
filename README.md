# Rilvaryx ⚽

Rilvaryx is a cross-platform mobile sports application built with React Native, TypeScript, and Expo. The app allows users to search for soccer teams, view team information, browse competitions, and see match results using real-world sports data from API-Sports.

The goal of Rilvaryx is to combine sports scores, team news, personalized team following, and social features into a single mobile experience.

> 🚧 Rilvaryx is currently under active development.

## Features

### Currently Implemented

- 🔎 Search for soccer teams
- 🏟️ View team information, including team name, logo, and country
- ⚽ View match results for individual teams
- 🏆 Retrieve competitions associated with each team
- 🔄 Switch between competitions to view league-specific matches
- 🧭 Dynamic team pages using Expo Router
- 🌐 Real sports data provided by API-Sports
- 📱 Cross-platform mobile interface with React Native

### Planned Features

- ⭐ Follow favorite teams
- 📰 Team-specific sports news
- 👤 User authentication and profiles
- 💬 Real-time messaging between users
- 🏠 Personalized home feed
- 🔔 Team and match notifications
- 📊 Improved match and team statistics
- 🎨 Polished sports-focused UI

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| TypeScript | Type-safe application development |
| Expo | React Native development platform |
| Expo Router | File-based navigation and dynamic routing |
| API-Sports | Team, league, and match data |
| News API | Sports news *(planned)* |
| Supabase | Authentication, database, and messaging *(planned)* |

## Project Structure

```text
Rilvaryx/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── messages.tsx
│   │   ├── profile.tsx
│   │   ├── scores.tsx
│   │   └── search.tsx
│   │
│   ├── team/
│   │   └── [teamId].tsx
│   │
│   └── _layout.tsx
│
├── components/
│   └── ScoreCard.tsx
│
├── services/
│   └── sportsApi.ts
│
├── types/
│   └── sports.ts
│
└── README.md
```

## How It Works

Rilvaryx separates API communication, application data models, reusable components, and screens.

For example, searching for a team follows this flow:

```text
User searches for a team
        ↓
searchTeams()
        ↓
API-Sports
        ↓
Team results
        ↓
User selects a team
        ↓
/team/[teamId]
        ↓
Team information + competitions
        ↓
User selects competition
        ↓
getGames()
        ↓
Match results
```

This allows team pages to be generated dynamically instead of hardcoding individual teams or competitions.

## API Integration

Sports data is retrieved from API-Sports.

The application currently uses API requests for:

- Team search
- Team information
- Team competitions
- Match fixtures and results

API responses are transformed inside the service layer into TypeScript models before being passed to UI components.

For example:

```ts
export type Team = {
  id: number;
  name: string;
  logo: string;
  country: string;
};
```

This keeps API-specific response structures separate from the rest of the application.

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Rilvaryx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
EXPO_PUBLIC_SPORTS_API_KEY=your_api_sports_key
```

Do not commit your actual API key to GitHub.

### 4. Start the application

```bash
npx expo start
```

You can then run the application through Expo Go, an emulator, or a development build.

## Environment Variables

The following environment variable is currently required:

```env
EXPO_PUBLIC_SPORTS_API_KEY=
```

Create your own `.env.local` file and provide your API-Sports key.

The repository should include an `.env.example` file showing the required variables without exposing real credentials.

## Roadmap

Rilvaryx is being developed incrementally.

The next major development stages include:

1. Improve team and score UI
2. Add loading and error states
3. Integrate sports news
4. Add user authentication
5. Allow users to follow teams
6. Build personalized sports feeds
7. Add user-to-user messaging
8. Add notifications
9. Expand sports and league support

## Security

API credentials are stored using environment variables and should not be committed to source control.

Make sure the following files are included in `.gitignore`:

```gitignore
.env
.env.local
.env.*
```

For production, sensitive API requests should be moved to a secure backend rather than exposing private credentials in the client application.

## Author

**Jair Mateo**

Computer Science student building Rilvaryx as a full-stack mobile sports platform.

## Status

🚧 **In Development**

Rilvaryx is an active project. Features, architecture, and UI are continuing to evolve as development progresses.
