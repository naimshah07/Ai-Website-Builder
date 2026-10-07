# AI Site Builder 🌐✨

An AI-powered website builder that generates complete, responsive websites from natural language prompts.  
The platform handles authentication, credits & billing, live previews, and deployment-ready code — all in one place.

---

🔗 **Live App** : <br>
Link : (https://aisitebuilder.site/) <br>
---

## 🚀 Features

- 🤖 **AI Website Generation**
  - Generate full websites (HTML, CSS, JS) from user prompts
  - Modular and scalable generation pipeline
  - Optimized for **NVIDIA Nemotron-3 Ultra 550B (Free Tier via OpenRouter)**

- 🔐 **Authentication System**
  - Secure user authentication
  - Password reset via email (token-based)
  - OAuth-ready architecture

- 💳 **Credits & Billing**
  - Credit-based usage system
  - Stripe integration for payments
  - Automatic credit updates after successful transactions

- 👥 **Community Module**
  - Explore websites created by other users
  - Public previews with SPA routing support

- 👀 **Live Preview System**
  - Instant preview of generated websites
  - SPA-safe routing (no 404 on refresh)
  - Separate preview and production builds

- ⚙️ **Frontend–Backend Separation**
  - Fully decoupled client and server
  - Environment-based API configuration

- 🩺 **Backend Health Monitoring**
  - Health check endpoint for uptime monitoring
  - Render deployment with Uptime Robot support

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (NeonDB)

### AI / Generation
- OpenRouter – NVIDIA Nemotron-3 Ultra 550B A55B (Free)

### Auth & Payments
- Better Auth
- Stripe

### Deployment
- Frontend: Vercel / Render
- Backend: Vercel / Render
- Database: NeonDB (PostgreSQL)

---


Client (React)
│
│ API Calls (Axios)
▼
Backend (Node + Express)
│
├── Auth & Users
├── Credits & Billing
├── AI Website Generator
├── Community & Preview
│
▼
PostgreSQL (NeonDB)


- Frontend and backend are fully independent
- Backend URL is injected via environment variables
- SPA routing handled both in frontend and server

---


## 🛣️ Upcoming Features

The following features are planned to enhance functionality, scalability, and user experience:

- 💳 **Razorpay Payment Integration**
  - Support for Indian users with UPI, Cards, Net Banking, and Wallets
  - Seamless credit purchase using Razorpay
  - Webhook-based payment verification

- 🤖 **Multiple AI Model Support**
  - Model selection at generation time
  - Support for Gemini, Mistral, and other LLMs
  - Smart fallback system when a model is unavailable

- ⚡ **Faster Website Generation**
  - Streaming AI responses
  - Prompt optimization and caching
  - Reduced generation latency on free-tier models

- 📦 **Export & Download**
  - Download generated websites as ZIP files
  - Clean project structure for local hosting
  - Framework-ready exports (React, static HTML)

- 🌐 **Custom Domain Support**
  - Connect user-owned domains
  - SSL-enabled deployments
  - Subdomain management

- 👥 **Team & Collaboration**
  - Invite team members to projects
  - Role-based access control
  - Shared credits and workspaces

- 📊 **Usage Analytics**
  - Track website generations and credit usage
  - Performance insights for generated sites
  - Admin-level dashboards

- 🎨 **Advanced Customization**
  - Theme editor (colors, fonts, layouts)
  - Regenerate specific sections
  - Manual code edits with live preview

- 🧩 **Template Marketplace**
  - Pre-built templates by category
  - Community-contributed designs
  - One-click customization

---

## 🌍 Environment Variables

### Frontend
```env
VITE_API_URL=https://your-backend-url.com
VITE_AUTH_CALLBACK_URL=https://your-frontend-url.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### Backend
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=your_neon_db_url
BETTER_AUTH_URL=https://your-backend-url.com
BETTER_AUTH_SECRET=your_auth_secret_min_32_chars
TRUSTED_ORIGINS=https://your-frontend-url.com
AI_API_KEY=sk-or-v1_xxx
RESEND_API_KEY=re_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 📦 Installation & Setup

Follow the steps below to run the project locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ai-site-builder.git
cd ai-site-builder
```

### 2️⃣ Install Dependencies

**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd server
npm install
```

### 3️⃣ Environment Configuration

Create `.env` files for both frontend and backend (see examples above in **Environment Variables** section).

**Frontend (`client/.env`)**
```env
VITE_API_URL=http://localhost:3001
```

**Backend (`server/.env`)** — min required for local:
```env
PORT=3001
DATABASE_URL=your_neon_database_url
BETTER_AUTH_URL=http://localhost:3001
BETTER_AUTH_SECRET=your_auth_secret_min_32_chars
TRUSTED_ORIGINS=http://localhost:5173
AI_API_KEY=sk-or-v1_xxx
RESEND_API_KEY=re_xxx
```

### 4️⃣ Run Database Migrations

```bash
cd server
npx prisma migrate dev --config prisma.config.ts
```

### 5️⃣ Run the Application

**Start Backend Server**
```bash
cd server
npm run dev
```

**Start Frontend Client**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:**  http://localhost:3001

---

### 🩺 Health Check

The backend exposes a health endpoint used for uptime monitoring and deployment verification.

```
GET /health → { "status": "ok" }
```

This endpoint is monitored using Uptime Robot to prevent cold starts.

---

### ⚙️ Build for Production

**Frontend**
```bash
cd client
npm run build
```

**Backend**
```bash
cd server
npm run build   # prisma generate + tsc -b
npm start       # or node dist/server.js
```

---

### 🚀 Deployment (Vercel)

Frontend and backend are deployed **separately**:

1. **Deploy `server/` folder first** on Vercel (Node.js):
   - Root Directory: `server`
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Development Command: `npm run dev`
   - Add **all backend env vars** in Vercel Project Settings → Environment Variables
2. Copy the deployed backend URL (e.g. `https://ai-site-builder-api.vercel.app`)
3. **Deploy `client/` folder** on Vercel (React/Vite):
   - Root Directory: `client`
   - Framework Preset: `Vite`
   - Env var: `VITE_API_URL=<your-deployed-backend-url>`
   - Env var: `VITE_AUTH_CALLBACK_URL=<your-deployed-frontend-url>`
4. **Update backend `TRUSTED_ORIGINS`** and `BETTER_AUTH_URL` with the live frontend/backend URLs.

Backend URL is injected into the frontend via environment variables.
SPA routing is handled to prevent 404 errors on refresh.
PostgreSQL is hosted on NeonDB.

---

## 🤝 Contributing

Contributions are welcome and appreciated!

Fork the repository

Create a new branch

git checkout -b feature/your-feature-name


Commit your changes

git commit -m "Add your feature"


Push to your branch

git push origin feature/your-feature-name


Open a Pull Request

📝 Notes

Ensure Stripe webhooks are correctly configured in production

Credit updates occur only after successful Stripe payment confirmation

Password reset uses secure, token-based email verification.
----



