# 🌟 Chat App

Welcome to **Video & Chat App** – a modern, full-stack real-time chat and video calling platform!  
Connect, chat, and collaborate with friends using seamless messaging and high-quality video calls, all powered by cutting-edge technologies.

---

## 🚀 Features

- **User Authentication & Onboarding**
  - Secure sign-up, login, and logout with JWT & bcrypt
  - Onboarding flow: set up your profile, bio, languages, and location
  - Random avatar assignment for new users

- **Friend System**
  - Send, accept, and manage friend requests
  - See recommended users and your friends list
  - Real-time notifications for friend requests

- **1:1 Real-Time Chat**
  - Instant messaging with Stream Chat API
  - Modern chat UI with threads, message input, and chat history
  - Send and receive video call invitations directly in chat

- **Video Calling**
  - High-quality video calls powered by Stream Video SDK
  - One-click to start or join a call with friends
  - In-call controls and speaker layouts for a smooth experience

- **Responsive & Modern UI**
  - Built with React 19, TailwindCSS, and DaisyUI for a beautiful, mobile-friendly interface
  - Dark/light theme support and intuitive navigation

---

## 🛠️ Tech Stack

### Frontend
- **React 19** – Modern, fast, and component-driven UI
- **Vite** – Lightning-fast development and build tool
- **TailwindCSS & DaisyUI** – Utility-first, customizable styling
- **Stream Chat & Video SDKs** – Real-time chat and video features
- **Zustand** – Simple, scalable state management
- **React Query** – Powerful data fetching and caching
- **React Router** – Seamless navigation
- **Lucide React** – Beautiful icons
- **Axios** – HTTP client for API requests

### Backend
- **Node.js & Express** – Robust REST API server
- **MongoDB & Mongoose** – Flexible, scalable NoSQL database
- **JWT & bcrypt** – Secure authentication and password hashing
- **Stream Chat** – Real-time messaging backend
- **dotenv, cors, cookie-parser** – Essential middleware for security and environment management

---

## 🧑‍💻 How It Works

1. **Sign Up & Onboard:**  
   Create an account, set up your profile, and get matched with recommended users.

2. **Connect with Friends:**  
   Send and accept friend requests. Your friends list updates in real time.

3. **Chat & Collaborate:**  
   Start a chat with any friend. Messages are delivered instantly, and you can send a video call invite right from the chat.

4. **Jump on a Video Call:**  
   Click the call button to launch a video call. Enjoy smooth, high-quality video and audio.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Stream API keys (for chat and video)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chat-app.git
cd chat-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

- Copy `.env.example` to `.env` in both `backend` and `frontend` folders.
- Add your MongoDB URI and Stream API keys.

### Running the App

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

Visit `http://localhost:5173` to get started!

---

## ✨ Why You'll Love This App

- **Blazing Fast:** Built with the latest React and Vite for instant feedback.
- **Real-Time Everything:** Chat and video are powered by industry-leading APIs.
- **Secure:** Modern authentication and best practices throughout.
- **Beautiful UI:** Clean, modern, and responsive – looks great everywhere.
- **Open Source:** Tweak, extend, and make it your own!

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgements

- [Stream](https://getstream.io/) for their amazing chat and video APIs
- [React](https://react.dev/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), and all open-source contributors

---

> _Made with ❤️ by the Chat App Team_ 