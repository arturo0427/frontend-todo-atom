# Project Run Guide

Angular application generated with Angular CLI 17.3.17.

## Prerequisites

- Node.js 18 LTS or newer.
- npm 9 or newer (bundled with Node.js).
- Angular CLI installed globally: `npm install -g @angular/cli`.
- Backend available at `http://localhost:5001/api` for development, or the configured URL for production.

## Initial Setup

1. Install dependencies: `npm install`.
2. Confirm the environment files point to the correct URLs:
   - Development: `src/environments/environment.ts`.
   - Production: `src/environments/environment.prod.ts`.

## Run in Development Mode

- Start the dev server: `npm start` (equivalent to `ng serve`).
- The application is available at `http://localhost:4200/`.
- The server reloads automatically when it detects file changes.

## Build for Production

- Run `npm run build`.
- Build artifacts are generated in `dist/frontend/browser`.
- Serve that folder with any static server to review the compiled version.

## Deploy to Firebase Hosting

1. Create a production build: `npm run build -- --configuration production`.
2. Ensure the Firebase CLI is installed (`npm install -g firebase-tools`) and you are logged in (`firebase login`).
3. Deploy: `firebase deploy --only hosting`.

## Common Issues

- Port 4200 in use: run `ng serve --port 4300`.
- API errors: verify the backend is running and `apiBaseUrl` points to the correct address.
