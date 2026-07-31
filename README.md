<div align="center">
  <h1>🎲 Behind The Odds</h1>
  <p><strong>A MERN stack casino simulator built with responsible gambling in mind.</strong></p>
</div>

<br />

## 📖 About the Project

**Behind The Odds** is a full-stack web application that simulates casino games using a virtual currency (FKE). Unlike traditional gambling apps, it actively promotes **responsible gambling** by integrating recovery tools, a dynamic risk assessment score, cooldown periods, and self-exclusion mechanisms ("Take a Break"). It demonstrates game mechanics while keeping players in check with extensive analytics and transparency tools.

## ✨ Features

- 🎮 **Virtual Casino Games:** Play Crash, Mines, Plinko, Slots, and Mystery Box entirely risk-free using virtual FKE currency.
- 🛡️ **Responsible Gambling Tools:** Features a "Take A Break" mechanism and calculated Risk Scores based on session data.
- 💰 **Wallet Management:** Easily track and manage your virtual currency balance.
- 📊 **Transaction History:** Complete transparency on all past game sessions, deposits, and outcomes.
- 📈 **Detailed Analytics:** Understand your gambling behavior with insightful data and a heatmap of your activity.
- 🔐 **Secure Authentication:** Robust user login and registration system.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Tailwind CSS
- Recharts (for Analytics)
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## 📂 Folder Structure

```text
gambling-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic & controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express API routes
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point for backend
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/      # Static images and icons
    │   ├── components/  # Reusable UI components
    │   ├── context/     # React Context providers
    │   ├── layouts/     # Dashboard and page layouts
    │   ├── pages/       # Route-level components
    │   ├── services/    # API calls (Axios instances)
    │   ├── utils/       # Frontend utilities
    │   ├── App.jsx      # Main application router
    │   └── main.jsx     # Entry point for frontend
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation Guide

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd gambling-app
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 💻 How to Run the Project

You will need two terminal windows to run both the frontend and backend concurrently.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The frontend will typically be accessible at `http://localhost:5173` and the backend will run on `http://localhost:5000`.

## 🔑 Key Features Overview

*   **Dashboard:** Your starting point, giving a high-level overview of your account balance and recent statistics.
*   **Wallet:** Manage your virtual currency (FKE).
*   **Games:** Realistic simulations of popular casino games—Crash, Mines, Plinko, Slots, and Mystery Box.
*   **Transactions:** A complete, unaltered history of every game played and its outcome.
*   **Recovery:** A dedicated page featuring your Risk Assessment score, active session statistics, Cooldown timers, and an option to "Take A Break" for 1 to 365 days.
*   **Analytics:** Interactive charts and an activity heatmap to track the frequency of your gambling.
*   **Authentication:** Secure, JWT-based login, and signup functionality.
*   **Settings:** Basic app information and secure logout functionality.

## 🔮 Future Improvements

- Implementation of more classic casino games (e.g., Roulette, Blackjack).
- Advanced gamification like global leaderboards and user achievements.
- Enhanced recovery features and real-world support resources.
- Multi-currency support and detailed sound design for games.

## 👨‍💻 Author

**Arjun** - [ragoarjun/behind-the-odds](https://github.com/ragoarjun/behind-the-odds)

---
*Disclaimer: This app uses virtual currency (FKE) only. It does not support real-money gambling.*
