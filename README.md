# ByWay - Online Learning Management System

## Overview
**ByWay** is a robust online learning management system inspired by platforms like **Udemy**, designed to provide a seamless experience for learners, instructors, and administrators.  

Built with **React**, **TypeScript**, and **Vite**, ByWay offers a **scalable**, **user-friendly** platform with features like course browsing, payment processing, instructor revenue analytics, and an admin dashboard.  

The project was developed by a team of four trainees (**Mohamed, Ola, Mennah, Asmaa**) over two weeks, with tasks distributed across authentication, learner features, instructor features, and admin dashboard development.

---

## Project Goal
ByWay aims to create an interactive e-learning platform that supports:

- **Learners**: Discover, enroll, and engage with courses.  
- **Instructors**: Create, manage, and monetize courses.  
- **Administrators**: Oversee platform operations, user management, and financial transactions.  

---

## Features

### 🔐 Authentication
- **User Registration**: Single endpoint for learners and instructors with email verification and social login (Google, Facebook, Microsoft).  
- **Login**: Unified endpoint for learners, instructors, and admins.  
- **Forgot Password**: Secure, time-limited reset via email.  
- **Logout**: Secure session termination.  

### 🎓 Learner Features
- Profile management (aligned with Figma design).  
- Enrolled courses with progress tracking.  
- Course browsing with **smart search** and filtering.  
- Favorites & Cart functionality.  
- Detailed course pages with reviews (only enrolled learners can review).  
- Video playback with completion tracking.  
- Secure payments (**Fawry, E-Wallet, Credit/Debit Card, Stripe**) with email + in-app notifications.  
- Payment history and saved methods.  
- In-app notifications.  
- Account closure option.  

### 👨‍🏫 Instructor Features
- Profile management with social media links.  
- Course management (create, edit, delete, search, filter).  
- Course details (students + reviews).  
- Revenue analytics with charts and metrics.  
- Withdrawal requests.  
- In-app notifications.  

### 🛠️ Admin Dashboard
- **Overview**: Charts & metrics for learners, instructors, courses, revenue, and payouts.  
- **User Management**: Manage learner and instructor accounts.  
- **Course Management**: Approve, edit, or delete courses.  
- **Payments & Revenue**: Monitor transactions & payouts.  
- **Reviews & Ratings**: Manage or remove inappropriate reviews.  
- **Platform Settings**: Categories, payment policies, notification settings.  
- **Reports & Analytics**: Detailed reports on performance, growth, and revenue.  

---

## ⚙️ Tech Stack

- **Framework**: React (v19.1.1) + TypeScript (v5.8.3)  
- **Build Tool**: Vite (v7.1.0)  
- **State Management**: Redux Toolkit (v2.8.2)  
- **API Handling**: Axios (v1.11.0) + TanStack Query (v5.84.2)  
- **Routing**: React Router (v7.8.0)  
- **Styling**: Tailwind CSS (v3.4.17), Tailwind Merge, Tailwind Animate  
- **UI Components**: Radix UI  
- **Forms**: Formik (v2.4.6) + Yup (v1.7.0)  
- **Payments**: Stripe (v18.4.0)  
- **Charts**: Recharts (v3.1.2)  
- **Notifications**: React Toastify (v11.0.5), Sonner (v2.0.7)  
- **Internationalization**: i18next (v25.3.4)  
- **Icons**: Lucide React (v0.541.0)  
- **Linting & Type Checking**: ESLint (v9.32.0), TypeScript  

---

## 🚀 Project Setup

### Prerequisites
- Node.js (v18+)  
- npm (v9+)  

### Installation
```bash
# Clone the repository
git clone https://github.com/mohamedgomaaf/ByWay-Courses
cd ByWay-Courses

# Install dependencies
npm install

# Create .env file and configure environment variables
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Start the development server
npm run dev
