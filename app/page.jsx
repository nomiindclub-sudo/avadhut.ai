"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const practices = [
  {
    title: "Atma Vichara",
    teacher: "Ramana Maharshi",
    minutes: 10,
    path: "Advaita",
    intro: "Direct self inquiry toward awareness.",
    steps: [
      "Sit silently.",
      "Observe thoughts.",
      "Ask: To whom has this thought appeared?",
      "Notice the answer: to me.",
      "Ask: Who am I?",
      "Rest as awareness."
    ]
  },

  {
    title: "Anapanasati",
    teacher: "Buddha",
    minutes: 12,
    path: "Mindfulness",
    intro: "Observe breathing naturally.",
    steps: [
      "Observe inhale.",
      "Observe exhale.",
      "Return when distracted.",
      "Stay aware of breath.",
      "Remain relaxed."
    ]
  },

  {
    title: "Zazen",
    teacher: "Zen Tradition",
    minutes: 15,
    path: "Zen",
    intro: "Just sit in awareness.",
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
  const [tab, setTab] = useState("home");
  const [openedPractice, setOpenedPractice] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!openedPractice) return;

    setSecondsLeft(openedPractice.minutes * 60);
    setRunning(false);
  }, [openedPractice]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          setRunning(false);
          return 0;
        }

        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  function restartTimer() {
    if (!openedPractice) return;

    setRunning(false);
    setSecondsLeft(openedPractice.minutes * 60);
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

        <p>
          Awareness • Meditation • Contemplative Intelligence
        </p>
      </section>

      <nav className="tabs">
        <button onClick={() => setTab("home")}>
          Home
        </button>

        <button onClick={() => setTab("meditation")}>
          Meditation
        </button>
      </nav>

      {tab === "home" && (
        <section className="grid">
          <div className="card big">
            <h2>Meditation Library</h2>

            <p>
              Explore authentic contemplative methods.
            </p>
          </div>
        </section>
      )}

      {tab === "meditation" && !openedPractice && (
        <section>

          <h2 className="sectionTitle">
            Meditation Methods
          </h2>

          <div className="practiceGrid">

            {practices.map((p) => (

              <button
                key={p.title}
                className="card practiceCard"
                onClick={() => setOpenedPractice(p)}
              >

                <span className="tag">
                  {p.path}
                </span>

                <h3>{p.title}</h3>

                <small>{p.teacher}</small>

                <p>{p.intro}</p>

                <small>{p.minutes} min</small>

              </button>

            ))}

          </div>

        </section>
      )}

      {tab === "meditation" && openedPractice && (

        <section className="practiceDetail">

          <button
            className="backButton"
            onClick={() => setOpenedPractice(null)}
          >
            ← Back
          </button>

          <div className="card premiumTimer">

            <span className="tag">
              {openedPractice.path}
            </span>

            <h2>{openedPractice.title}</h2>

            <small>{openedPractice.teacher}</small>

            <p>{openedPractice.intro}</p>

            <div className="timer">
              {mins}:{secs}
            </div>

            <div className="timerActions">

              <button
                className="primary"
                onClick={() => setRunning(!running)}
              >
                {running ? "Pause" : "Start"}
              </button>

              <button
                className="secondary"
                onClick={restartTimer}
              >
                Restart
              </button>

            </div>

          </div>

          <div className="stepsBox">

            <h2>Guided Steps</h2>

            {openedPractice.steps.map((step, index) => (

              <div className="stepCard" key={index}>

                <span>{index + 1}</span>

                <p>{step}</p>

              </div>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}
