"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const START_MESSAGE = {
  role: "assistant",
  content:
    "I am Avdhut AI — a contemplative awareness companion."
};

const practices = [
  {
    title: "Atma Vichara",
    teacher: "Ramana Maharshi",
    minutes: 10,
    path: "Advaita",
    intro: "Direct self inquiry toward awareness.",
    steps: [
      "Sit silently and relax the body.",
      "Observe thoughts arising.",
      "Ask: To whom has this thought appeared?",
      "Notice the answer: to me.",
      "Ask: Who am I?",
      "Rest as awareness itself."
    ]
  },

  {
    title: "Anapanasati",
    teacher: "Buddha",
    minutes: 12,
    path: "Mindfulness",
    intro: "Mindfulness of breathing.",
    steps: [
      "Observe the inhale.",
      "Observe the exhale.",
      "When distracted, return gently.",
      "Feel the breath naturally.",
      "Remain relaxed and aware."
    ]
  },

  {
    title: "Zazen",
    teacher: "Zen Tradition",
    minutes: 15,
    path: "Zen",
    intro: "Just sitting in direct awareness.",
    steps: [
      "Sit upright.",
      "Breathe naturally.",
      "Allow thoughts to come and go.",
      "Do not control experience.",
      "Rest in presence."
    ]
  }
];

export default function Home() {

  const [entered, setEntered] =
    useState(false);

  const [tab, setTab] =
    useState("home");

  const [openedPractice,
    setOpenedPractice] =
    useState(null);

  const [journal,
    setJournal] =
    useState("");

  const [entries,
    setEntries] =
    useState([]);

  const [secondsLeft,
    setSecondsLeft] =
    useState(0);

  const [running,
    setRunning] =
    useState(false);

  const [sessions,
    setSessions] =
    useState(0);

  const [input,
    setInput] =
    useState("");

  const [messages,
    setMessages] =
    useState([START_MESSAGE]);

  useEffect(() => {

    const savedEntries =
      JSON.parse(
        localStorage.getItem(
          "journal"
        ) || "[]"
      );

    const savedSessions =
      Number(
        localStorage.getItem(
          "sessions"
        ) || 0
      );

    setEntries(savedEntries);

    setSessions(savedSessions);

  }, []);

  useEffect(() => {

    if (!openedPractice)
      return;

    setSecondsLeft(
      openedPractice.minutes * 60
    );

    setRunning(false);

  }, [openedPractice]);

  useEffect(() => {

    if (!running) return;

    const timer =
      setInterval(() => {

        setSecondsLeft((s) => {

          if (s <= 1) {

            clearInterval(timer);

            setRunning(false);

            const newSessions =
              sessions + 1;

            setSessions(
              newSessions
            );

            localStorage.setItem(
              "sessions",
              String(newSessions)
            );

            return 0;
          }

          return s - 1;

        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [running, sessions]);

  async function sendMessage(e) {

    e.preventDefault();

    if (!input.trim()) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: input
      }
    ];

    setMessages(updatedMessages);

    setInput("");

    try {

      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              messages:
                updatedMessages
            })
          }
        );

      const data =
        await response.json();

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            "No response."
        }
      ]);

    } catch {

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Something went wrong."
        }
      ]);

    }

  }

  function saveJournal() {

    if (!journal.trim())
      return;

    const updated = [
      {
        text: journal,
        date:
          new Date()
            .toLocaleString()
      },
      ...entries
    ];

    setEntries(updated);

    localStorage.setItem(
      "journal",
      JSON.stringify(updated)
    );

    setJournal("");

  }

  function restartTimer() {

    if (!openedPractice)
      return;

    setRunning(false);

    setSecondsLeft(
      openedPractice.minutes *
      60
    );

  }

  function newChat() {

    setMessages([
      START_MESSAGE
    ]);

    setInput("");

  }

  function editMessage(index) {

    setInput(
      messages[index]
        .content
    );

    const updated = [
      ...messages
    ];

    updated.splice(index);

    setMessages(updated);

  }

  const mins = String(
    Math.floor(
      secondsLeft / 60
    )
  ).padStart(2, "0");

  const secs = String(
    secondsLeft % 60
  ).padStart(2, "0");

  if (!entered) {

    return (

      <main className="welcomePage">

        <div className="welcomeCard">

          <div className="brandMark">
            <div className="ensoCircle"></div>
          </div>

          <h1>Avdhut AI</h1>

          <p>
            Awareness • Meditation •
            Contemplative Intelligence
          </p>

          <button
            className="primary"
            onClick={() =>
              setEntered(true)
            }
          >
            Continue as Guest
          </button>

          <button
            className="secondary bigBtn"
            onClick={() =>
              setEntered(true)
            }
          >
            Sign in to save your journey
          </button>

        </div>

      </main>

    );

  }

  return (

    <main className="page">

      <section className="hero">

        <div className="brandMark">
          <div className="ensoCircle"></div>
        </div>

        <h1>Avdhut AI</h1>

        <p>
          Awareness • Meditation •
          Contemplative Intelligence
        </p>

      </section>

      <nav className="tabs">

        <button
          onClick={() =>
            setTab("home")
          }
        >
          Home
        </button>

        <button
          onClick={() =>
            setTab("chat")
          }
        >
          AI Guide
        </button>

        <button
          onClick={() =>
            setTab(
              "meditation"
            )
          }
        >
          Meditation
        </button>

        <button
          onClick={() =>
            setTab(
              "journal"
            )
          }
        >
          Journal
        </button>

        <button
          onClick={() =>
            setTab(
              "progress"
            )
          }
        >
          Progress
        </button>

      </nav>

      {tab === "home" && (

        <section className="grid">

          <div className="card big">

            <h2>
              Meditation Library
            </h2>

            <p>
              Explore authentic
              contemplative methods.
            </p>

          </div>

          <div className="card">

            <h3>
              Meditation Sessions
            </h3>

            <span className="stat">
              {sessions}
            </span>

          </div>

          <div className="card">

            <h3>
              Journal Entries
            </h3>

            <span className="stat">
              {entries.length}
            </span>

          </div>

        </section>

      )}

      {tab === "chat" && (

        <section className="chatBox">

          <div className="timerActions">

            <button
              className="secondary"
              onClick={newChat}
            >
              New Chat
            </button>

          </div>

          <div className="messages">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={
                    msg.role ===
                    "user"
                      ? "message user"
                      : "message ai"
                  }
                >

                  <p>
                    {msg.content}
                  </p>

                  {msg.role ===
                    "user" && (

                    <div className="messageActions">

                      <button
                        className="editBtn"
                        onClick={() =>
                          editMessage(
                            index
                          )
                        }
                      >
                        ✎
                      </button>

                    </div>

                  )}

                </div>

              )
            )}

          </div>

          <form
            onSubmit={sendMessage}
            className="inputArea"
          >

            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              placeholder="Ask Avdhut..."
            />

            <button type="submit">
              Send
            </button>

          </form>

        </section>

      )}

      {tab === "meditation" &&
        !openedPractice && (

        <section>

          <h2 className="sectionTitle">
            Meditation Methods
          </h2>

          <div className="practiceGrid">

            {practices.map(
              (p) => (

                <button
                  key={p.title}
                  className="card practiceCard"
                  onClick={() =>
                    setOpenedPractice(
                      p
                    )
                  }
                >

                  <span className="tag">
                    {p.path}
                  </span>

                  <h3>
                    {p.title}
                  </h3>

                  <small>
                    {p.teacher}
                  </small>

                  <p>
                    {p.intro}
                  </p>

                  <small>
                    {p.minutes} min
                  </small>

                </button>

              )
            )}

          </div>

        </section>

      )}

      {tab === "meditation" &&
        openedPractice && (

        <section className="practiceDetail">

          <button
            className="backButton"
            onClick={() =>
              setOpenedPractice(
                null
              )
            }
          >
            ← Back
          </button>

          <div className="card premiumTimer">

            <span className="tag">
              {openedPractice.path}
            </span>

            <h2>
              {
                openedPractice.title
              }
            </h2>

            <small>
              {
                openedPractice.teacher
              }
            </small>

            <p>
              {
                openedPractice.intro
              }
            </p>

            <div className="timer">
              {mins}:{secs}
            </div>

            <div className="timerActions">

              <button
                className="primary"
                onClick={() =>
                  setRunning(
                    !running
                  )
                }
              >
                {running
                  ? "Pause"
                  : "Start"}
              </button>

              <button
                className="secondary"
                onClick={
                  restartTimer
                }
              >
                Restart
              </button>

            </div>

          </div>

          <div className="stepsBox">

            <h2>
              Guided Steps
            </h2>

            {openedPractice.steps.map(
              (
                step,
                index
              ) => (

                <div
                  className="stepCard"
                  key={index}
                >

                  <span>
                    {index + 1}
                  </span>

                  <p>{step}</p>

                </div>

              )
            )}

          </div>

        </section>

      )}

      {tab === "journal" && (

        <section className="journalBox">

          <h2>
            Awareness Journal
          </h2>

          <textarea
            value={journal}
            onChange={(e) =>
              setJournal(
                e.target.value
              )
            }
            placeholder="What did you observe today?"
          />

          <button
            className="primary"
            onClick={
              saveJournal
            }
          >
            Save Reflection
          </button>

          <div className="entries">

            {entries.map(
              (
                entry,
                index
              ) => (

                <div
                  className="entry"
                  key={index}
                >

                  <small>
                    {entry.date}
                  </small>

                  <p>
                    {entry.text}
                  </p>

                </div>

              )
            )}

          </div>

        </section>

      )}

      {tab === "progress" && (

        <section className="grid">

          <div className="card">

            <h3>
              Total Sessions
            </h3>

            <span className="stat">
              {sessions}
            </span>

          </div>

          <div className="card">

            <h3>
              Journal Entries
            </h3>

            <span className="stat">
              {entries.length}
            </span>

          </div>

        </section>

      )}

    </main>

  );

}
