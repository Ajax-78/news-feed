# 📰 News Feed Dashboard

A modern **Next.js-based news dashboard** that aggregates real-time articles and blogs from third-party news APIs. The application provides secure authentication, advanced content discovery, global search, filtering, and a payout calculator with export functionality.

## 🚀 Features

* 📰 **Real-Time News** — Fetch and display the latest articles and blogs using third-party news APIs.
* 🔐 **Secure Authentication**

  * Email & password authentication
  * GitHub OAuth authentication
  * Protected application features
* 🔎 **Global Search** — Search articles and news content across the application.
* 🎯 **Advanced Filtering** — Filter news based on relevant categories and search criteria.
* 💰 **Payout Calculator** — Calculate payouts based on user-defined inputs.
* 📄 **Export Options**

  * Export payout data as PDF
  * Export data as CSV
* 📱 **Responsive UI** — Designed to work across desktop, tablet, and mobile devices.
* ⚡ **Next.js Architecture** — Uses Next.js for optimized routing, rendering, and API integration.

## 🛠️ Tech Stack

* **Frontend:** Next.js, React.js, JavaScript
* **Authentication:** NextAuth.js, GitHub OAuth
* **API Integration:** REST APIs, Axios
* **Styling:** CSS / Tailwind CSS
* **Data Export:** jsPDF, CSV
* **Version Control:** Git & GitHub

## 📂 Project Structure

```text
news-feed/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── news/
│   ├── components/
│   ├── ...
│
├── public/
├── package.json
├── package-lock.json
├── .env.local
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ajax-78/news-feed.git
cd news-feed
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GUARDIAN_API_KEY=your_guardian_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

> Never commit `.env.local` or expose API keys and authentication secrets in the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔑 Authentication

The application uses **NextAuth.js** for authentication and supports:

* Email/password authentication
* GitHub OAuth
* Session-based authentication
* Protected application routes

OAuth credentials should be configured through environment variables rather than hardcoded in the application.

## 📰 News API Integration

News articles are retrieved from third-party APIs through server-side API routes.

The application supports:

* Keyword-based searches
* Category filtering
* Article metadata
* Thumbnails
* Author information
* Publication information

Server-side API handling helps keep API credentials away from client-side code.

## 💰 Payout Calculator

The dashboard includes a payout calculator that allows users to enter relevant values and calculate payout amounts.

Calculated data can be exported in:

```text
PDF
CSV
```

This makes the calculator useful for both on-screen analysis and offline record keeping.

## 📦 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server.

## 🔒 Security

* API keys are stored in environment variables.
* Authentication credentials are not hardcoded.
* `.env.local` should never be committed to GitHub.
* Server-side API routes are used where appropriate to avoid exposing sensitive API credentials.

## 📈 Future Improvements

* Infinite scrolling / pagination
* Personalized news recommendations
* Bookmark and saved articles
* Additional OAuth providers
* Caching for frequently requested news
* Improved analytics dashboard
* Automated testing

## 👨‍💻 Author

**Pawan Sharma**

GitHub: [Ajax-78](https://github.com/Ajax-78)


## SCREENSHORT of NEWS-FEED

<img width="945" height="417" alt="image" src="https://github.com/user-attachments/assets/f9abd488-7a7d-4881-9ea7-f9bf22ea71b5" />


<img width="945" height="395" alt="news feed" src="https://github.com/user-attachments/assets/a32ebf04-47d9-4096-a356-6368df243be8" />

