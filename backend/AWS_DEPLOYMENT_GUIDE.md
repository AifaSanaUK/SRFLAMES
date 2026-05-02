# 🚀 SR Flames AWS Deployment Guide

To eliminate the 60-second loading delay, we will deploy the backend to **AWS App Runner**. This service provides an "Always On" environment that is fully managed and lightning-fast.

## Prerequisites
- An AWS Account.
- GitHub access (to link your repository).

---

## Step 1: Push Code to GitHub
Ensure the new `Dockerfile` and `.dockerignore` are pushed to your repository:
```bash
git add .
git commit -m "chore: added docker configuration for AWS deployment"
git push origin main
```

---

## Step 2: Set up AWS App Runner
1.  Log in to your **AWS Management Console**.
2.  Search for **App Runner** and click **Create service**.
3.  **Source and deployment**:
    *   Repository type: **Source code repository**.
    *   Connect your GitHub account and select the `SRFLAMES` repository.
    *   Branch: `main`.
    *   Deployment settings: **Automatic** (This redeploys every time you push code).
4.  **Configure build**:
    *   Configuration file: Select **"Configure all settings here"**.
    *   Runtime: **Nodejs 18**.
    *   Build command: `npm install`.
    *   Start command: `node index.js`.
    *   Port: `5000`.
5.  **Configure service**:
    *   **Environment variables**: Add your `MONGO_URI` and any other secrets from your `.env` file here.
    *   Auto-scaling: Leave as default (or select "High performance" if needed).

---

## Step 3: Update Frontend
Once AWS gives you the new "Service URL" (e.g., `https://random-id.us-east-1.awsapprunner.com`):
1.  Go to your **Frontend** folder.
2.  Open your `.env` file (or `config.js`).
3.  Update the `VITE_API_URL` to point to the new AWS URL.

---

## Why this is better:
- **No Cold Starts**: Unlike free hosting, AWS App Runner keeps your app warm and ready.
- **Auto-Scaling**: If your showroom gets a surge of visitors, AWS adds more power automatically.
- **Security**: Managed by AWS with built-in HTTPS and protection.

---

**Your backend is now "Cloud-Ready"! Just follow the GitHub link in AWS App Runner and you'll be live with zero lag.** 🥂💎☁️🚀
