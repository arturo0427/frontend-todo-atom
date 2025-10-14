# 🎨 TODO Frontend — Angular 17 + Firebase Hosting

This project is the **frontend** for the TODO system built with **Angular 17**,  
integrated with **Firebase Hosting** for fast and secure deployment.

It communicates with the Node.js backend (deployed on Firebase Functions) to manage authentication and tasks.

---

## ⚙️ Tech Stack

- **Angular 17 (Standalone Components)**
- **Bootstrap 5.3**
- **TypeScript**
- **RxJS / Observables**
- **SweetAlert2** for alerts
- **Firebase Hosting** for deployment

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                # Global services, guards, interceptors
│   │   ├── features/            # Feature modules (auth, tasks, users, etc.)
│   │   ├── shared/              # Reusable components, directives, and pipes
│   │   └── app.routes.ts        # Route configuration
│   ├── assets/                  # Images, icons, and translations
│   ├── environments/            # Environment files (dev and prod)
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html               # Main entry point
│   ├── main.ts                  # Bootstrap for Angular
│   └── styles.scss              # Global styles (Bootstrap included)
│
├── .firebaserc                  # Firebase project configuration
├── firebase.json                # Firebase Hosting setup
├── package.json                 # Dependencies and scripts
└── angular.json                 # Angular CLI configuration
```

---

## 🌍 Environment Variables

The app uses Angular environments for configuration.

**File:** `src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:5001/api", // Local backend
};
```

**File:** `src/environments/environment.prod.ts`

```ts
export const environment = {
  production: true,
  apiUrl: "https://api-yourfirebaseapp.cloudfunctions.net/api", // Deployed backend
};
```

> ⚠️ Make sure your production environment points to your deployed Firebase Functions endpoint.

---

## 🚀 Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arturo0427/frontend-todo-atom.git
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the application locally

```bash
ng serve
```

Then open your browser at:

```
http://localhost:4200/
```

---

## 🧱 Build for Production

```bash
ng build --configuration production
```

The build output will be located in the `dist/` directory.

---

## ☁️ Deploy to Firebase Hosting

### 1️⃣ Login to Firebase

```bash
firebase login
```

### 2️⃣ Initialize Hosting (only first time)

```bash
firebase init hosting
```

When prompted:

- **Select your Firebase project** → `todo-1a513`
- **Public directory** → `dist/<your-project-name>`
- **Configure as SPA** → `Yes`
- **Set up automatic builds and deploys with GitHub** → Optional (recommended)

### 3️⃣ Deploy manually

```bash
firebase deploy --only hosting
```

After deployment, Firebase will return your live URL:

```
https://todo-1a513.web.app
```

---

## 🧩 Available NPM Scripts

| Command                               | Description                  |
| ------------------------------------- | ---------------------------- |
| `ng serve`                            | Run the app locally          |
| `ng build --configuration production` | Build the production version |
| `firebase deploy --only hosting`      | Deploy to Firebase Hosting   |
| `npm run lint`                        | Run ESLint checks            |
| `npm run test`                        | Run unit tests               |

---

## 🔐 Authentication Flow

1. The user logs in through `/auth/login`.
2. A JWT is stored in `localStorage`.
3. AuthGuard verifies token validity before accessing protected routes.
4. Logout clears session and redirects to the login page.

---

## 👥 Author

**Arturo Muñoz**  
Full Stack Developer — Node.js | Angular | React | ThreeJs  
📧 [arturo_munoz27@outlook.com](mailto:arturo_munoz27@outlook.com)
📧 [LinkedIn](https://www.linkedin.com/in/arturom0427/)
