import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON bodies
  app.use(express.json());

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, model } = req.body;

      // Aliyun DashScope API Configuration
      const API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
      const API_KEY = process.env.ALIYUN_API_KEY || "sk-719c62dd46e54610b6cf94d81bd6f8aa"; // Fallback to the provided key
      const MODEL_NAME = model || "qwen3-max";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: messages
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Aliyun API Error:", errorData || response.statusText);
        return res.status(response.status).json(errorData || { error: `HTTP Error ${response.status}` });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Server Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
