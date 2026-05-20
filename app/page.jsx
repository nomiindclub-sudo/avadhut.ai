"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const practices = [
  {
    title: "Atma Vichara",
    teacher: "Ramana Maharshi",
    tradition: "Advaita Vedanta",
    time: "10 min",
    minutes: 10,
    path: "Self Inquiry",
    text: "Trace attention back toward the sense of 'I'.",
    guide:
      "Sit silently. Notice any thought that appears. Ask gently: To whom has this thought arisen? Then ask: Who am I? Do not answer intellectually. Let attention return toward the one who is aware.",
  },
  {
    title: "Sakshi Bhava",
    teacher: "Nisargadatta Maharaj",
    tradition: "Witness Consciousness",
    time: "8 min",
    minutes: 8,
    path: "Witnessing",
    text: "Remain as the witnessing presence behind experience.",
    guide:
      "Do not fight thoughts. Do not follow them. Simply observe. Thoughts arise and disappear in awareness. Stay as the knowing presence itself.",
  },
  {
    title: "Anapanasati",
    teacher: "Buddha",
    tradition: "Buddhist Mindfulness",
    time: "12 min",
    minutes: 12,
    path: "Mindfulness",
    text: "Observe the natural breath with relaxed awareness.",
    guide:
      "Bring attention to the inhale and exhale. Feel the breath naturally. When thoughts arise, notice them gently and return to breathing.",
  },
  {
    title: "Dynamic Witnessing",
    teacher: "Osho",
    tradition: "Awareness Meditation",
    time: "10 min",
    minutes: 10,
    path: "Catharsis & Witnessing",
    text: "Allow thoughts and emotions while remaining aware.",
    guide:
      "Thoughts may move rapidly. Emotions may arise. Do not suppress anything. Watch all movement like clouds passing through the sky.",
  },
  {
    title: "Raja Yoga Concentration",
    teacher: "Swami Vivekananda",
    tradition: "Raja Yoga",
    time: "9 min",
    minutes: 9,
    path: "Concentration",
    text: "Train the mind to rest steadily on one point.",
    guide:
      "Sit upright. Bring the mind gently to a single object — breath, sound, or awareness itself. Every return strengthens the mind.",
  },
  {
    title: "Isha Awareness Practice",
    teacher: "Sadhguru",
    tradition: "Inner Engineering",
    time: "7 min",
    minutes: 7,
    path: "Inner Distance",
    text: "Create distance between yourself and body-mind activity.",
    guide:
      "Observe the body silently. Then observe the mind. Thoughts are happening, but they are not you.",
  },
  {
    title: "Zen Sitting",
    teacher: "Zen Tradition",
    tradition: "Zazen",
    time: "15 min",
    minutes: 15,
    path: "Stillness",
    text: "Just sit. Nothing to attain.",
    guide:
      "Sit steadily and breathe naturally. Let experience unfold without grasping or rejecting anything.",
  },
  {
    title: "Yoga Nidra",
    teacher: "Tantric Yoga",
    tradition: "Deep Relaxation",
    time: "20 min",
    minutes: 20,
    path: "Relaxation",
    text: "Relax consciously while remaining aware.",
    guide:
      "Bring awareness slowly through different parts of the body. Relax each region completely while remaining gently aware.",
  },
  {
    title: "Loving Kindness",
    teacher: "Metta Meditation",
    tradition: "Compassion",
    time: "10 min",
    minutes: 10,
    path: "Heartfulness",
    text: "Develop warmth and goodwill toward yourself and others.",
    guide:
      "Silently repeat: May I be peaceful. May others be peaceful. Let the feeling expand naturally.",
  },
  {
    title: "Kashmir Shaivism Awareness",
    teacher: "Vigyan Bhairava Tantra",
    tradition: "Direct Awareness",
    time: "11 min",
    minutes: 11,
    path: "Awareness",
    text: "Rest in the gap between thoughts and sensations.",
    guide:
      "Notice the brief silence between breaths, thoughts, or sounds. Rest attention there.",
  },
];

export default function Home() {
  const [tab, setTab] = useState("home");
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(practices[0]);
  const [minutes, setMinutes] = useState(practices[0].minutes);
  const [secondsLeft, setSecondsLeft] = useState(practices[0].minutes * 60);
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
    setEntries(JSON.parse(localStorage.getItem("journal") || "[]"));
    setSessions(Number(localStorage.getItem("sessions") || 0));
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

  function selectPractice(p) {
    setSelectedPractice(p);
    setMinutes(p.minutes);
    setSecondsLeft(p.minutes * 60);
    setRunning(false);
  }

  function restartTimer() {
    setRunning(false);
    setSecondsLeft(minutes * 60);
  }

  function saveJournal() {
    if (!journal.trim()) return;

    const updated = [
      { text: journal, date: new Date().toLocaleString() },
      ...entries,
    ];

    setEntries(updated);
    localStorage.setItem("journal", JSON.stringify(updated));
    setJournal("");
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedMessages }),
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
        <div className="brandMark">
          <div className="ensoCircle"></div>
        </div>

        <h1>Avdhut AI</h1>
        <p>Awareness • Meditation • Contemplative Intelligence</p>
      </section>

      <nav className="tabs">
        <button className={tab === "home" ? "activeTab" : ""} onClick={() => setTab("home")}>
          Home
        </button>
        <button className={tab === "chat" ? "activeTab" : ""} onClick={() => setTab("chat")}>
          AI Guide
        </button>
        <button className={tab === "meditation" ? "activeTab" : ""} onClick={() => setTab("meditation")}>
          Meditation
        </button>
        <button className={tab === "journal" ? "activeTab" : ""} onClick={() => setTab("journal")}>
          Journal
        </button>
        <button className={tab === "progress" ? "activeTab" : ""} onClick={() => setTab("progress")}>
          Progress
        </button>
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
            <h2>Spiritual Traditions</h2>
            <p>
              Vedanta, Buddhism, Zen, Tantra, Witnessing, Mindfulness,
              Compassion, Self-Inquiry, and Yogic Awareness.
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
        <section className="meditationLayout">
          <div className="card big center premiumTimer">
            <span className="tag">{selectedPractice.path}</span>
            <h2>{selectedPractice.title}</h2>
            <small>{selectedPractice.teacher}</small>
            <p>{selectedPractice.text}</p>

            <div className="guideBox">
              <h3>Guided Practice</h3>
              <p>{selectedPractice.guide}</p>
            </div>

            <div className="timer">
              {mins}:{secs}
            </div>

            <div className="timerActions">
              <button className="primary" onClick={() => setRunning(!running)}>
                {running ? "Pause" : "Start"}
              </button>

              <button className="secondary" onClick={restartTimer}>
                Restart
              </button>
            </div>
          </div>

          <div className="practiceGrid">
            {practices.map((p) => (
              <button
                type="button"
                className={
                  selectedPractice.title === p.title
                    ? "card practiceCard selectedCard"
                    : "card practiceCard"
                }
                key={p.title}
                onClick={() => selectPractice(p)}
              >
                <span className="tag">{p.path}</span>
                <h3>{p.title}</h3>
                <small>{p.teacher}</small>
                <p>{p.text}</p>
                <small>{p.time}</small>
              </button>
            ))}
          </div>
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
            <p>Pause once daily. Observe thoughts before reacting to them.</p>
          </div>
        </section>
      )}

      <p className="disclaimer">
        Avdhut is for contemplative and educational guidance only.
      </p>
    </main>
  );
}
