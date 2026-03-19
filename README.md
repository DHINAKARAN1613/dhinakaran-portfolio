# MERN Stack Portfolio for Dhinakaran M

A high-performance, ultra-modern developer portfolio built entirely with open-source technologies. Features a fully custom glassmorphism design, Framer Motion animations, and a secure JWT-authenticated admin dashboard for dynamic content management.

## 🚀 Key Features

*   **Ultra-Modern UI/UX**: Glassmorphism, tailored gradients, and premium font pairings.
*   **Framer Motion Animations**: Scroll-based reveals, seamless page transitions, and interactive hover states.
*   **Dynamic Portfolio Details**: Projects managed securely from the database.
*   **Admin Dashboard**: Protect routes using JSON Web Tokens (JWT). Built-in CRUD functionality for Projects and Contact Messages.
*   **100% Free Deployment**: Designed to leverage the free tiers of Vercel, Render, and MongoDB Atlas.

## 🛠️ Tech Stack

*   **Frontend**: React (v18), Vite, Tailwind CSS, Framer Motion, Axios.
*   **Backend**: Node.js, Express, strict Input Validation using express-validator.
*   **Database**: MongoDB & Mongoose.
*   **Security & Auth**: JWT, bcryptjs.

## 🏃‍♂️ Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dhinakaran/dhinakaran.git
    cd dhinakaran
    ```

2.  **Setup Backend:**
    ```bash
    cd server
    npm install
    # Copy .env.example to .env and fill in your MONGO_URI
    npm run seed # Seeds default admin user and sample projects
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```

4.  **Admin Access**:
    Navigate to `http://localhost:5173/admin`
    Default Credentials: `admin@dhinakaran.dev` | `Admin@123`

## 🌍 Live Deployment
Check out the complete, platform-specific guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

---
*Built with React, Express, and ❤️ by Dhinakaran M.*
