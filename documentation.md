# Personal Finance AI - Technical Documentation

## 1. Project Overview
**Personal Finance AI** is a modern, responsive web application designed for personal financial management. It features expense tracking, budgeting, lending/borrowing management, and AI-powered financial insights. The application is built as a Single Page Application (SPA) using React and Vite, with a focus on client-side persistence and privacy.

## 2. Technology Stack

### Core Frameworks & Libraries
- **Runtime**: Node.js (Development)
- **Build Tool**: [Vite](https://vitejs.dev/) (v7.2.4) - chosen for fast HMR and optimized builds.
- **Frontend Library**: [React](https://react.dev/) (v19.2.0) - utilizing Functional Components and Hooks.
- **Routing**: [React Router](https://reactrouter.com/) (v7.10.1) - Client-side routing with protected routes.

### Styling & UI
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) (v4.1.17) - Utility-first CSS for rapid UI development.
- **Icons**: [Lucide React](https://lucide.dev/) - Consistent and lightweight icon set.
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library for financial visualizations.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - For smooth UI transitions.
- **Date Handling**: [Date-fns](https://date-fns.org/) - Lightweight date utility library.

### State Management & Storage
- **State Management**: React Context API (`FinanceContext`, `LendingContext`, `BorrowingContext`, `CurrencyContext`).
- **Persistence**: `localStorage` - Data is persisted in the browser's local storage, ensuring data privacy and offline capability without a dedicated backend database.

### AI Integration
- **Provider**: OpenAI (via direct API calls).
- **Model**: Default `gpt-4o-mini` (configurable).
- **Functionality**: Generates financial insights and budget advice based on local transaction data.

## 3. Architecture & Design Pattern

The application follows a **Modular Component-Based Architecture** with a clear separation of concerns:

### 3.1. Directory Structure
```
src/
├── Auth/           # Authentication logic (Route protection)
├── Components/     # Reusable UI components (Forms, Charts, Modals)
├── Context/        # Global State Providers (Business Logic Layer)
├── Pages/          # Page-level components (Route targets)
├── Utils/          # Helper functions and API clients
├── App.jsx         # Main application layout and Routing configuration
└── main.jsx        # Entry point
```

### 3.2. State Management Strategy
The application uses a **Decentralized Context Pattern**. Instead of a single global store (like Redux), state is divided by domain:
- **FinanceContext**: Manages core financial data (Transactions, Budgets, Passkey). Handles business logic like calculating balances (`cashBalance`, `onlineBalance`) and visibility toggles (`isSensitive`).
- **LendingContext**: Manages "Money Given" records.
- **BorrowingContext**: Manages "Money Taken" records.
- **CurrencyContext**: Handles currency conversion rates and formatting.

### 3.3. Authentication & Security
- **Authentication**: Implemented via `AuthContext` (inferred) and `LoginForm`.
- **Route Protection**: `ProtectedRoute` component wraps private routes (`/dashboard`, `/transactions`, etc.), redirecting unauthenticated users to `/login`.
- **Data Privacy**: A "Sensitive Transaction" feature allows users to hide specific transactions behind a secondary "Passkey" (implemented in `FinanceContext`).

## 4. Key Feature Implementation

### 4.1. Financial Tracking
Transactions are stored as objects with properties: `id`, `amount`, `type` (income/expense), `category`, `date`, `paymentMode` (Cash/Online), and `isSensitive`.
- **Logic**: `FinanceContext` aggregates these to calculate total Cash vs. Bank balances dynamically using `useMemo` for performance.

### 4.2. AI Insights Engine (`AIInsightsPanel.jsx`)
1.  **Data Preparation**: The app aggregates visible transactions and budgets locally.
2.  **Prompt Engineering**: usage of `buildFinancePrompt` (in `Utils/AiPrompts`) to create a context-aware prompt containing summaries, not raw PII (Personally Identifiable Information).
3.  **API Call**: `callLLM_OpenAI` (in `Utils/LlmClient.js`) sends the request to OpenAI's Chat Completion API.
4.  **Caching**: Results are cached in `localStorage` (`pfm_ai_cache_`) based on a snapshot hash of the data to prevent redundant API calls and save costs.

### 4.3. Lending & Borrowing
Separate contexts track debts. These modules likely maintain their own independent lists in `localStorage` (`pfm_lending`, `pfm_borrowing` inferred keys) but follow the same CRUD pattern as the main finance module.

## 5. Setup & Configuration

### Prerequisites
- Node.js (LTS recommended)
- NPM or Yarn

### Installation
1.  **Clone/Download** the repository.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    - The app requires an OpenAI API Key for AI features. This is currently entered via the UI (Settings page) and stored in `localStorage` (`pfm_ai_key`), bypassing the need for `.env` files for the key, though it assumes a single-user local environment.

### Running Development Server
```bash
npm run dev
```
Access the app at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

## 6. Future Extensibility
- **Backend Integration**: The `Context` layer can be refactored to replace `localStorage` calls with API calls (e.g., to a Node/Express backend) without changing the UI components.
- **Multi-User Support**: Currently single-user (browser-bound). Adding a real Auth Provider (Firebase/Auth0) would enable multi-device sync.
