# OASIS Jimma × Method Collective Verification Pass

A premium, mobile-first React web application built to serve as a digital verification pass for the partnership between OASIS Jimma and Method Collective. This application is designed with a modern wellness aesthetic, utilizing smooth animations and visual fraud-prevention features.

## ✨ Features

- **Two-Step User Flow**: A clean, elegant welcome screen capturing the user's name, which smoothly transitions into the live verification pass.
- **Fraud Prevention**: To prevent users from using screenshots, the verification pass features:
  - A real-time updating digital clock (updates every second).
  - A continuous, dynamic background gradient animation.
  - A pulsing "Verified Live" badge.
  - A randomly generated, unique Session ID.
- **Persistent State**: The user's name, session ID, and issue date are saved in the browser's `localStorage`. Refreshing the page automatically retrieves the active pass without requiring re-entry.
- **Midnight Expiration**: Passes are strictly valid for the same day only. If a user attempts to load an old pass on a different day, the system detects the date rollover and immediately invalidates it, showing a "Pass Expired" screen.
- **Premium Animations**: Utilizes `framer-motion` for buttery smooth screen transitions and micro-interactions (hover, tap, and loading states).

## 🛠️ Technology Stack

- **React 19**: Component architecture and state management.
- **Vite**: Ultra-fast frontend tooling and bundling.
- **Tailwind CSS v4**: Modern utility-first CSS framework configured via the `@tailwindcss/vite` plugin and native `@theme` CSS variables.
- **Framer Motion**: Production-ready animations and layout transitions.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed.

### Installation

1. Clone or download the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server with hot-module replacement (HMR):
```bash
npm run dev
```
Navigate to `http://localhost:5173/` to view the app.

To reset your testing session and view the Welcome screen again, simply clear your browser's Local Storage for the site or click the "Start New Session" button on the expiration page.

### Building for Production

To create an optimized production bundle:
```bash
npm run build
```
This will generate the compiled static files in the `dist` directory, which can be deployed to any static host (Vercel, Netlify, GitHub Pages, AWS S3, etc.).

## 🎨 Theming

The primary and secondary colors are defined inside the `src/index.css` file using Tailwind v4's CSS variables:

```css
@theme {
  --color-primary: #006400; /* Dark Green */
  --color-secondary: #FFA500; /* Orange */
}
```
You can easily adjust these values to update the entire application's color scheme.
