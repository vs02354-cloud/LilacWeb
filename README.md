# LilacTechSys – IT Solutions & Digital Services Platform

> **"Smart IT Solutions. Seamless Digital Growth."**

A modern, production-grade, highly responsive web application and administrative management console built for **LilacTechSys**, an IT solutions and digital services engineering firm.

---

## 🚀 Key Features

### 🌐 Public Experience
- **Hero & Value Proposition**: Engaging aesthetic with Lilac-themed ambient glows (`#9B7EDE`, `#4B2E83`), dynamic call-to-actions, and interactive metrics counter.
- **8 Core Services Hub & Detail Pages**:
  - Web Application Development
  - Mobile App Engineering
  - Custom Software Solutions
  - Cloud Architecture & DevOps
  - UI/UX Experience Design
  - Strategic IT Consulting
  - Cybersecurity & Compliance
  - Managed Maintenance & Support
- **Case Studies & Portfolio**: Filterable by technology and category, dynamic slug routes, measurable client impact metrics, and architectural breakdowns.
- **Thought Leadership & Blog**: Technical insights, category filtering, search, read-time estimations, and full article reader.
- **Interactive Talent Acquisition & Careers**: Job listings, department filters, and application submission drawer with PDF resume upload.
- **Interactive 4-Step Quote Estimator**: Step-by-step wizard (Services -> Budget -> Timeline -> Details) with celebration confetti.
- **Contact & Global Presence**: Validated inquiry forms, direct messaging, office addresses, and embedded maps.
- **Accessibility & UX**:
  - Persistent Dark / Light Mode with theme transitions.
  - Floating WhatsApp quick-connect trigger.
  - GDPR-compliant cookie consent banner.
  - SEO-optimized metadata with Open Graph tags via React Helmet Async.

### 🛡️ Admin Management Console (`/admin`)
- **JWT-Protected Dashboard**: Secure session authentication, claims handling, and auto-refresh mechanisms.
- **Live Telemetry Overview**: Real-time metrics counters for active services, case studies, published articles, inbound leads, and quote requests.
- **Content Management Systems (CRUD)**:
  - Practice Area Services Manager
  - Case Studies & Project Portfolio Manager
  - Articles & Whitepapers Editor
  - Job Openings & Hiring Pipeline Manager
- **Lead Capture & Submissions**:
  - Inbound Quote Requests with status pipeline transitions (Pending -> In Review -> Quoted -> Accepted -> Declined).
  - Contact Inquiry Inbox with read/unread flags.
  - Resume review and download for applicant tracking.
  - Newsletter subscriber registry.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with customized Lilac design tokens and glassmorphism utilities
- **Routing**: [React Router v6/v7](https://reactrouter.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand marks
- **API Client**: [Axios](https://axios-http.com/) with automatic token injection and error interceptors
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Effects**: Canvas Confetti

---

## 📁 Project Structure

```
frontend/
├── public/                  # Favicon, robots.txt, sitemap.xml, assets
├── src/
│   ├── assets/              # Branding and image media
│   ├── components/
│   │   ├── admin/           # AdminLayout, navigation sidebar
│   │   └── common/          # Navbar, Footer, ThemeToggle, CookieBanner,
│   │                        # FloatingWhatsApp, SeoHelmet, Pagination, SocialIcons
│   ├── context/
│   │   ├── AuthContext.jsx  # JWT auth state and login/logout handlers
│   │   └── ThemeContext.jsx # Light / Dark mode persistence
│   ├── pages/
│   │   ├── admin/           # AdminLogin, Dashboard, Services, Projects,
│   │   │                    # Blogs, Careers, Submissions
│   │   ├── About.jsx        # Company history, values, timeline & team
│   │   ├── Blog.jsx         # Technical articles listing & filters
│   │   ├── BlogDetail.jsx   # Article reader view
│   │   ├── Careers.jsx      # Job board & application drawer
│   │   ├── Contact.jsx      # Contact form & location details
│   │   ├── Home.jsx         # Main landing page
│   │   ├── NotFound.jsx     # Custom 404 handler
│   │   ├── Portfolio.jsx    # Filterable case study showcase
│   │   ├── PrivacyPolicy.jsx# Legal privacy policy
│   │   ├── ProjectDetail.jsx# Case study in-depth breakdown
│   │   ├── RequestQuote.jsx # 4-step interactive estimator wizard
│   │   ├── ServiceDetail.jsx# Detailed practice area specifications
│   │   ├── Services.jsx     # Comprehensive service directory
│   │   └── TermsOfService.jsx # Legal terms & conditions
│   ├── services/
│   │   └── api.js           # Centralized Axios client & backend endpoints
│   ├── App.jsx              # Application router hierarchy & providers
│   ├── index.css            # Tailored Tailwind theme & custom utilities
│   └── main.jsx             # React DOM root entry
├── index.html               # Semantic HTML5 entry with meta & fonts
├── package.json
└── vite.config.js           # Vite configuration with API reverse proxy
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/vs02354-cloud/LilacWeb.git
cd LilacWeb

# Install dependencies
npm install
```

### 3. Development Server
```bash
# Starts Vite dev server with Hot Module Replacement on http://localhost:5173
npm run dev
```

### 4. Production Build
```bash
# Compiles optimized production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Admin Console Access

To access the administrative console:
1. Navigate to `http://localhost:5173/admin/login`
2. Default SuperAdmin Credentials:
   - **Username**: `admin`
   - **Password**: `Admin@123`

---

## 📄 License
Copyright © 2026 LilacTechSys. All rights reserved.
