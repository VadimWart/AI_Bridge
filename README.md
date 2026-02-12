# AI Bridge

AI Bridge is a modern, real-time chat application effectively "bridging" the gap between users and advanced AI models. It features a sleek, responsive frontend built with Next.js and a robust Python backend powered by FastAPI and Google's Gemini AI.

## 🚀 Features

- **Real-time AI Chat**: Seamless conversation with Google's Gemini models.
- **Modern UI/UX**: Built with a responsive design, smooth animations (Framer Motion), and a clean aesthetic using Tailwind CSS.
- **Chat History**: Persists user conversations (locally via SQLite) for context-aware interactions.
- **Optimistic UI**: Immediate feedback for user actions.
- **Type-Safe**: Full TypeScript support on the frontend.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `clsx`, `tailwind-merge`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: Axios

### Backend

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python 3.12+
- **AI Integration**: [Google GenAI SDK](https://ai.google.dev/)
- **Database**: SQLite (via SQLAlchemy)
- **Server**: Uvicorn
- **Package Manager**: `uv` (recommended) or pip

## 📋 Prerequisites

- **Node.js**: v20+ recommended
- **Python**: v3.12+
- **Google API Key**: API key for Gemini (Get it [here](https://aistudio.google.com/app/apikey))

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-Bridge
```

### 2. Backend Setup

The backend handles the AI logic and database connections.

```bash
cd backend

# Create a virtual environment (if not using uv)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
# OR if using uv (recommended)
uv sync

# Configure Environment Variables
# Create a .env file in the backend directory
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

**Run the Backend:**

```bash
uvicorn main:app --reload --port 8009
```

The API will be available at `http://localhost:8009`.

### 3. Frontend Setup

The frontend is a Next.js application.

```bash
cd ../frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
AI-Bridge/
├── backend/                # Python FastAPI Backend
│   ├── main.py             # App entry point
│   ├── db.py               # Database models and session
│   ├── gemini_client.py    # AI logic
│   └── requests.db         # SQLite database
├── frontend/               # Next.js Frontend
│   ├── app/                # App Router pages
│   ├── components/         # React components (ChatInput, MessageList, etc.)
│   ├── lib/                # Utilities (store, api client)
│   └── public/             # Static assets
└── README.md
```
