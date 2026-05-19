"use client";

import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I am Avadhut AI — a contemplative awareness companion by Nomind Club.",
    },
  ]);

  const [input, setInput] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    if (!input.trim()) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ];

    setMessages(updatedMessages);
    setInput("");

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
        content: data.reply || "No response",
      },
    ]);
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="logoCircle"></div>

        <h1>Avadhut AI</h1>

        <p>
          Awareness • Meditation • Contemplative Intelligence
        </p>
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
        </div>

        <form onSubmit={sendMessage} className="inputArea">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Avadhut..."
          />

          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}
