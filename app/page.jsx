"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const practices = [
  {
    title: "Breath Awareness",
    time: "5 min",
    path: "Beginner",
    text: "Observe the natural breath without changing it. Return gently whenever the mind wanders.",
  },
  {
    title: "Witnessing Thoughts",
    time: "7 min",
    path: "Awareness",
    text: "Watch thoughts arise and pass. Do not fight them. Do not follow them.",
  },
  {
    title: "Body Grounding",
    time: "4 min",
    path: "Stability",
    text: "Feel your feet, hands, chest, and breath. Let attention return to the body.",
  },
  {
    title: "Self-Inquiry",
    time: "8 min",
    path: "Vedanta",
    text: "Ask gently: Who is aware of this thought? Do not answer intellectually. Observe.",
  },
  {
    title: "Loving Awareness",
    time: "6 min",
    path: "Compassion",
    text: "Bring a soft attention to yourself. Let awareness become less harsh and more spacious.",
  },
];

export default function Home() {
  const [tab, setTab] = useState("home");
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);
  const [minutes, setMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I am Avdhut AI — a contemplative awareness companion by Nomind Club.",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journal") || "[]");
    const savedSessions = Number(localStorage.getItem("sessions") || 0);
    setEntries(savedEntries);
    setSessions(savedSessions);
  }, []);

  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          setRunning(false);
          const newSessions = sessions + 1;
          setSessions(newSessions);
          localStorage.setItem("sessions", String(newSessions));
          return minutes * 60;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, minutes, sessions]);

  function saveJournal() {
    if (!journal.trim()) return;

    const newEntry = {
      text: journal,
      date: new Date().toLocaleString(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("journal", JSON.stringify(updated));
    setJournal("");
  }

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
        content: data.reply || "No response.",
      },
    ]);
  }

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <main className="page">
      <section className="hero">
        <div className="logoCircle"></div>
        <h1>Avdhut AI</h1>
        <p>Awareness • Meditation • Contemplative Intelligence</p>
      </section>

      <nav className="tabs">
        <button onClick={() => setTab("home")}>Home</button>
        <button onClick={() => setTab("chat")}>AI Guide</button>
        <button onClick={() => setTab("meditation")}>Meditation</button>
        <button onClick={() => setTab("journal")}>Journal</button>
        <button onClick={() => setTab("progress")}>Progress</button>
      </nav>

      {tab === "home" && (
        <section className="grid">
          <div className="card big">
            <h2>Today’s Awareness</h2>
            <p>
              Pause once today before reacting. Observe the first movement of
              the mind before it becomes a response.
            </p>
          </div>

          <div className="card">
            <h3>Meditation Sessions</h3>
            <span className="stat">{sessions}</span>
          </div>

          <div className="card">
            <h3>Journal Entries</h3>
            <span className="stat">{entries.length}</span>
          </div>

          <div className="card big">
            <h2>Spiritual Paths</h2>
            <p>
              Explore breath awareness, witnessing, self-inquiry, compassion,
              grounding, Vedantic reflection, and Buddhist mindfulness.
            </p>
          </div>
        </section>
      )}

      {tab === "chat" && (
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
              placeholder="Ask Avdhut..."
            />
            <button type="submit">Send</button>
          </form>
        </section>
      )}

      {tab === "meditation" && (
        <section className="grid">
          <div className="card big center">
            <h2>Meditation Timer</h2>
            <div className="timer">
              {mins}:{secs}
            </div>

            <select
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            >
              <option value={3}>3 minutes</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>

            <button className="primary" onClick={() => setRunning(!running)}>
              {running ? "Pause" : "Start Practice"}
            </button>
          </div>

          {practices.map((p) => (
            <div className="card" key={p.title}>
              <span className="tag">{p.path}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <small>{p.time}</small>
            </div>
          ))}
        </section>
      )}

      {tab === "journal" && (
        <section className="journalBox">
          <h2>Awareness Journal</h2>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="What did you observe in yourself today?"
          />
          <button className="primary" onClick={saveJournal}>
            Save Reflection
          </button>

          <div className="entries">
            {entries.map((entry, index) => (
              <div className="entry" key={index}>
                <small>{entry.date}</small>
                <p>{entry.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "progress" && (
        <section className="grid">
          <div className="card">
            <h3>Total Meditation Sessions</h3>
            <span className="stat">{sessions}</span>
          </div>

          <div className="card">
            <h3>Total Journal Entries</h3>
            <span className="stat">{entries.length}</span>
          </div>

          <div className="card big">
            <h2>Reminder</h2>
            <p>
              Set a daily phone reminder manually for now: “Pause. Breathe.
              Observe.” Notification automation can be added in the next build.
            </p>
          </div>
        </section>
      )}

      <p className="disclaimer">
        Avdhut is for contemplative and educational guidance only. It does not
        diagnose, treat, or manage mental or physical health conditions.
      </p>
    </main>
  );
}
