"use client";

import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I am Avdhoot AI — an awareness companion by Nomind Club. Ask about awareness, ego, suffering, meditation, or contemplative wisdom.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply || data.error || "No response received.",
        },
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="logoCircle"></div>
        <h1>Avdhoot AI</h1>
        <p>An awareness companion by Nomind Club.</p>
      </section>

      <section className="chatBox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "message user" : "message ai"}
            >
              {msg.content}
            </div>
          ))}

          {loading && <div className="message ai">Reflecting...</div>}
        </div>

        <form onSubmit={sendMessage} className="inputArea">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Avdhoot..."
          />
          <button type="submit" disabled={loading}>
            Send
          </button>
        </form>
      </section>

      <p className="disclaimer">
        Avdhoot is for contemplative and educational guidance only. It does not
        diagnose, treat, or manage mental or physical health conditions.
      </p>
    </main>
  );
}
