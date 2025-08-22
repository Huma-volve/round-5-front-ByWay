ByWay - Online Learning Management System
Overview
ByWay is a robust online learning management system inspired by platforms like Udemy, designed to provide a seamless experience for learners, instructors, and administrators. Built with React, TypeScript, and Vite, ByWay offers a scalable, user-friendly platform with features like course browsing, payment processing, instructor revenue analytics, and an admin dashboard. The project was developed by a team of four trainees (Mohamed, Ola, Mennah, Asmaa) over two weeks, with tasks distributed across authentication, learner features, instructor features, and admin dashboard development.
Project Goal
ByWay aims to create an interactive e-learning platform that supports:

Learners: Discover, enroll, and engage with courses.
Instructors: Create, manage, and monetize courses.
Administrators: Oversee platform operations, user management, and financial transactions.

Features
Authentication

User Registration: Single endpoint for learners and instructors with email verification and social login (Google, Facebook, or Microsoft).
Login: Unified endpoint for learners, instructors, and admins.
Forgot Password: Secure, time-limited password reset via email.
Logout: Secure session termination.

Learner Features

Profile Management: Update personal information (aligned with Figma design).
Enrolled Courses: View and track progress in enrolled courses.
Course Browsing: Smart search and filtering for courses and instructors.
Favorites & Cart: Add courses to favorites or cart for purchase.
Course Details: View detailed course info, including reviews (only enrolled learners can review).
Video Playback: Watch course videos and mark them as completed.
Payment: Purchase courses or cart items using Fawry, E-Wallet, or Credit/Debit Card, with email and in-app notifications.
Payment History: View transaction history.
Payment Methods: Add and manage payment methods.
Notifications: View and manage in-app notifications.
Account Closure: Option to permanently close an account.

Instructor Features

Profile Management: Update profile details, including social media links (aligned with Figma design).
Course Management: Create, edit, delete, search, and filter courses.
Course Details: View enrolled students and reviews for courses.
Reviews: View all course reviews.
Revenue Analytics: View total profits, available balance, last transaction, and performance charts.
Withdrawal Requests: Request withdrawals of available balance.
Notifications: View and manage in-app notifications.

Admin Dashboard

Overview: Displays charts and metrics for active learners, instructors, published courses, total revenue, top-rated courses, and recent payout requests.
User Management: Manage learner accounts (view, edit, delete, or suspend).
Instructor Management: Add, view, edit, or suspend instructor accounts.
Course Management: Approve, edit, or delete courses.
Payments & Revenue: Monitor transactions and manage payout requests.
Reviews & Ratings: Manage course reviews, with the ability to remove inappropriate ones.
Platform Settings: Configure categories, payment policies, and notification settings.
Reports & Analytics: Generate detailed reports on platform performance, user growth, and revenue.

Tech Stack

Framework: React (v19.1.1) with TypeScript (v5.8.3)
Build Tool: Vite (v7.1.0) for fast development and production builds
State Management: Redux Toolkit (v2.8.2) for global state management
API Handling: Axios (v1.11.0) with TanStack Query (v5.84.2) for data fetching and caching
Routing: React Router (v7.8.0) for client-side navigation
Styling: Tailwind CSS (v3.4.17) with Tailwind Merge and Animate for responsive, utility-first styling
UI Components: Radix UI components for accessible, customizable UI elements
Forms: Formik (v2.4.6) with Yup (v1.7.0) for form handling and validation
Payments: Stripe (v18.4.0) for secure payment processing
Charts: Recharts (v3.1.2) for data visualization in analytics
Notifications: React Toastify (v11.0.5) and Sonner (v2.0.7) for in-app notifications
Internationalization: i18next (v25.3.4) with browser language detection
Icons: Lucide React (v0.541.0) for scalable icons
Linting & Type Checking: ESLint (v9.32.0) and TypeScript for code quality and type safety

Project Setup
Prerequisites

Node.js (v18 or higher)
npm (v9 or higher)

Installation

Clone the repository:git clone https://github.com/username/byway.git
cd byway


Install dependencies:npm install


Create a .env file in the root directory and configure environment variables (e.g., API keys for Stripe, backend URL, etc.):VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key


Start the development server:npm run dev


Build for production:npm run build


Preview the production build:npm run preview



Scripts

npm run dev: Starts the Vite development server
npm run build: Builds the app for production
npm run lint: Runs ESLint for code quality
npm run preview: Previews the production build
npm run type-check: Runs TypeScript type checking
npm run type-check:watch: Runs TypeScript type checking in watch mode

Project Structure
byway/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images, fonts, and other static assets
│   ├── components/            # Reusable React components
│   │   ├── ui/                # Radix UI-based components
│   │   ├── common/            # Shared components (e.g., buttons, modals)
│   │   ├── learner/           # Learner-specific components
│   │   ├── instructor/        # Instructor-specific components
│   │   ├── admin/             # Admin dashboard components
│   ├── pages/                 # Page components (e.g., Home, CourseDetails)
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API service functions (Axios + TanStack Query)
│   ├── store/                 # Redux Toolkit store and slices
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions and helpers
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   ├── vite-env.d.ts          # Vite environment types
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore file
├── package.json               # Project metadata and dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── README.md                  # Project documentation

Key Implementation Details
Authentication

Social Login: Integrated with Google, Facebook, or Microsoft using OAuth2 via the backend.
Form Validation: Formik and Yup handle registration, login, and password reset forms with robust validation.
Secure Session: JWT-based authentication with secure logout and token refresh.

Learner Features

Course Browsing: TanStack Query fetches and caches course data, with search and filtering powered by query parameters.
Video Playback: Custom video player component with progress tracking and completion marking.
Payments: Stripe integration for secure payments, with Fawry and E-Wallet support via backend APIs.
Notifications: React Toastify and Sonner provide real-time in-app notifications.

Instructor Features

Course Management: CRUD operations for courses with TanStack Query and Axios.
Revenue Analytics: Recharts visualizes profit and performance data, fetched via API.
Withdrawal Requests: Formik forms for withdrawal requests, with validation and backend integration.

Admin Dashboard

Charts & Metrics: Recharts for visualizing platform metrics (e.g., active users, revenue).
User & Course Management: TanStack React Table for interactive, paginated tables.
Platform Settings: Dynamic forms for configuring categories and policies, persisted via API.

Styling

Tailwind CSS: Utility-first styling with Tailwind Merge for class management and Tailwind Animate for animations.
Radix UI: Accessible, unstyled components for dialogs, dropdowns, and navigation menus.
Responsive Design: Fully responsive layouts based on Figma designs.

Internationalization

i18next: Supports multiple languages with browser language detection for a localized experience.

Deployment

Build the project:npm run build


Deploy the dist folder to a static hosting service (e.g., Vercel, Netlify).
Ensure the backend API is deployed and the VITE_API_URL environment variable is updated accordingly.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Team
Developed by:

