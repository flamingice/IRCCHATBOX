# IRCCHATBOX

IRCCHATBOX is a mock IRC-style chat interface built with Vue 3 and Express.js. It simulates a real chat environment for
demo and testing purposes, showing active-looking conversations, DMs, and channel activity — all powered by file-based logs.

## 🚀 Features

- 📚 Channel and DM views with months of simulated message history
- 🧠 AI-generated mock logs to simulate real chat dynamics
- 💬 Live message input (messages append to `.log` files)
- 🧭 Sidebar navigation with unread indicators
- ➕ Create new channels and DMs (persisted as `.log` files)
- 🎯 Channel/DM-specific sidebar filtering
- 🧱 File-based storage
- 📦 Deployable on simple Node environments

---

## 🛠 Tech Stack

- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **Storage**: Plain `.log` files (JSON-lines format)

---

## 📁 Project Structure

```
├── client/              # Vue 3 frontend
│   ├── components/
│   ├── pages/
│   ├── services/        # API integrations
│   └── ...
├── server/              # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   └── logs/            # Stored channel/DM log files
```

---

## ⚙️ Getting Started

### 1. Clone the project
```bash
git clone https://github.com/your-username/ircchatbox.git
cd ircchatbox
```

### 2. Install dependencies
```bash
npm install
npm run install # installs both client and server
```

### 3. Run the app locally
```bash
npm start
```
This starts both the Express server and Vue client concurrently.

---

## 📄 Log File Format
Each message is stored as a JSON object in a `.log` file:
```json
{"user":"alice","timestamp":"2025-05-14 10:42","text":"Hello world!"}
```

- Channels: `logs/channels/{channelName}.log`
- DMs: `logs/dms/{username}.log`

---

## 📦 Deployment
You can deploy this on any simple Node/VPS server:
```bash
cd client && npm run build
cd ../server && node server.js
```
Then serve `client/dist/` statically or proxy it via Express.

---

## 🧪 Sample Data
You can generate realistic logs using the built-in Python script or manually create `.log` files.
Example:
```json
{"user":"bob","timestamp":"2025-05-14 12:05","text":"Hey there!"}
```

---

## 🙋 FAQ

**Q: Is this a real-time chat app?**  
A: No — it's a simulated interface. No websockets, no real-time backend.

**Q: Can I plug in my own logs?**  
A: Yes! Just drop `.log` files into `logs/channels/` or `logs/dms/`

**Q: Where are messages stored?**  
A: In plain `.log` files on disk.

---

## 👨‍💻 Author
Built with ❤️ by [Your Name] — powered by Vue 3 and Node.js.

---

## 📜 License
MIT License
