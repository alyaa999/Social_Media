# Thryve – Frontend

![cover](./screenshots/Thryvedark.png)

**Thryve** is a modern, twitter-like front-end web application designed for a microservices-based platform. Built using **Angular**, it delivers a dynamic and responsive user experience across core social functionalities including posts, real-time chat, notifications, profile management, and more.

This application is part of the **Integrated Software Development & Architecture** graduation project at the [Information Technology Institute (ITI)](https://iti.gov.eg/home), developed by the same team behind the Thryve backend.

---

## 👥 Team

* [@MahmoudRKeshk](https://github.com/MahmoudRKeshk)
* [@abdelrahmanramadan12](https://github.com/abdelrahmanramadan12)
* [@Emanabdallah92](https://github.com/Emanabdallah92)
* [@alyaa999](https://github.com/alyaa999)
* [@HadyAbdelhady](https://github.com/HadyAbdelhady)
* [@miinamaaher1](https://github.com/miinamaaher1)

---

## 🧰 Tech Stack

| Tech        | Description                                                              |
|-------------|--------------------------------------------------------------------------|
| **Angular** | SPA framework using Signals, RxJS, component-based architecture          |
| **SignalR** | Real-time communication for chat and notifications                       |
| **JWT**     | Secure token-based authentication and session management                 |
| **Tailwind**| Utility-first CSS framework for fast and modern styling                  |

---

Start your journey with Thryve through a welcoming and visually engaging entry point. The platform is designed to provide a seamless and modern user experience from the very first interaction.

![landing](./screenshots/tf00%20landing.png)

## ✨ Features

### 📝 Quick Registration

![signup](./screenshots/tf01%20signnup.png)

* Register with only **email and password**
* Token stored securely in local storage
* Redirected to profile completion flow

### 🧾 Multi-Step Profile Completion

![complete ypur profile](./screenshots/tf02%20complete.png)

* A flexible onboarding flow guiding the user through:
  * Name and username
  * Bio and interests
  * Profile picture upload
* Steps are optional and skippable, promoting early engagement

### 🔐 Token-Based Auth & Route Guards

![signin](./screenshots/tf03%20signin.png)

* JWT token validation on each request
* Guards to restrict access to:
  * Feed
  * Chat
  * Profile
  * Post creation
* Auto-redirect to login if session expires

### 📰 Feed Page + SignalR Notifications

![feed](./screenshots/tf04%20home.png)

* Personalized feed of posts from followed users
* **Real-time notifications** for:
  * New followers
  * New comments
  * Post reactions
* WebSocket fallback using SignalR

### 👤 Profile Page

![profile](./screenshots/tf05%20profile.png)

* View and edit personal profile
* Public/private profile settings
* Dynamic content based on logged-in user vs external view

### ✍️ Write Post + AI Rewriting

![post](./screenshots/tf06%20post%20+%20ai.png)

* Create a post with:
  * Text
  * Media (image/video)
* **AI Rewriting** option:
  * Enhance or rephrase text before publishing using integrated AI

### 💬 Chat Page with SignalR

![chat](./screenshots/tf07%20chat%20+%20signalr.png)

* Real-time 1-on-1 messaging
* Message delivery and seen status
* Auto-scroll and typing indicators
* Built with SignalR and connected to backend chat service

---

## 🚀 Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/YOUR_USERNAME/thryve-frontend
   cd thryve-frontend
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Environment Configuration**

   Create or edit `src/environment/environment.ts`:

   ```ts
   export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:7094/api/public/',
    aiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    aiKey: 'your ai key',
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    token: "Bearer your-auth-token",
    };
   ```

4. **Run the App**

   ```sh
   ng serve
   ```

   Open `http://localhost:4200` in your browser.
