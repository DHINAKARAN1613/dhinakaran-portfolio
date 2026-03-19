# 🚀 Deployment Guide: MERN Portfolio

This guide will walk you through deploying your full stack MERN portfolio completely **FREE** using open-source tools and free tiers of popular hosting platforms.

---

## 🏗️ 1. Database Setup: MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2. Click **Build a Database** and select the **FREE M0** tier.
3. Choose a provider (AWS/GCP/Azure) and a region close to you.
4. Set up Database Access:
   - Create a username and password (save these!).
5. Set up Network Access:
   - Add the IP Address `0.0.0.0/0` (Allows access from anywhere, necessary for cloud hosting).
6. Click **Connect**, choose **Drivers**, and copy the connection string.
7. Replace `<password>` with the password you created. This is your `MONGO_URI`.

---

## ⚙️ 2. Backend Deployment: Render (Free Tier)

We will deploy the Express server to [Render.com](https://render.com/).

1. Create a GitHub repository and push your code.
2. Sign up on Render with your GitHub account.
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. Configure the Web Service:
   - **Name**: `portfolio-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Scroll down to **Environment Variables** and add:
   - `MONGO_URI`: (Your MongoDB connection string from Step 1)
   - `JWT_SECRET`: (A long, random string like `my_super_secret_portfolio_key_123`)
   - `CLIENT_URL`: `https://your-frontend-domain.vercel.app` (You can update this after Vercel deployment)
7. Select the **Free** instance type and click **Create Web Service**.
8. Once deployed, copy your backend URL (e.g., `https://portfolio-api-xxxx.onrender.com`).

> **Note**: Free instances on Render spin down after 15 minutes of inactivity, so the first request might take ~50 seconds to wake up.

---

## ⚛️ 3. Frontend Deployment: Vercel (Free Tier)

We will deploy the React + Vite frontend to [Vercel](https://vercel.com/).

1. Sign up on Vercel with your GitHub account.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Configure the Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
5. Open the **Environment Variables** section and add:
   - `VITE_API_URL`: (Your Render backend URL + `/api`, e.g., `https://portfolio-api-xxxx.onrender.com/api`)
6. Click **Deploy**.
7. Once finished, copy the provided Vercel domain.

---

## 🔗 4. Final Connections

1. Go back to your **Render** dashboard.
2. Open your `portfolio-api` web service.
3. Navigate to **Environment**, edit `CLIENT_URL`, and set it to your new Vercel domain.
4. Save the changes (Render will automatically redeploy).

---

## 🔐 5. Admin Portal Setup

1. In your local terminal, navigate to the `server/` directory.
2. Run `npm run seed` locally to create the initial admin user in your MongoDB database.
3. Go to your live Vercel site and navigate to `/admin`.
4. Log in with:
   - **Email**: `admin@dhinakaran.dev`
   - **Password**: `Admin@123`
5. **(Important)**: Inside the admin dashboard, create your real projects. Also, as this is an open-source template, you may want to manually update the seed user password directly in your MongoDB cluster (via MongoDB Compass) for production security.

🎉 **Congratulations! Your Full Stack Developer Portfolio is live.**
