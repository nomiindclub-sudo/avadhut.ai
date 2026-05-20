```jsx
"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const practices = [
  {
    title: "Atma Vichara",
    teacher: "Ramana Maharshi",
    minutes: 10,
    path: "Advaita",
    intro: "Direct self-inquiry toward the source of awareness.",
    steps: [
      "Sit silently.",
      "Notice thoughts appearing.",
      "Ask: To whom has this thought appeared?",
      "Notice the answer: to me.",
      "Ask gently: Who am I?",
      "Rest in awareness instead of answering intellectually.",
    ],
  },

  {
    title: "Neti Neti",
    teacher: "Upanishadic Tradition",
    minutes: 12,
    path: "Vedanta",
    intro: "Recognize what you are not.",
    steps: [
      "Observe the body.",
      "Recognize: I am aware of the body.",
      "Observe thoughts and emotions.",
      "Recognize: I am aware of the mind.",
      "Silently repeat: not this, not this.",
      "Rest as awareness itself.",
    ],
  },

  {
    title: "Sakshi Bhava",
    teacher: "Witness Consciousness",
    minutes: 8,
    path: "Witnessing",
    intro: "Remain as the observer of all experience.",
    steps: [
      "Sit quietly.",
      "Observe the breath.",
      "Watch thoughts arise and disappear.",
      "Do not interfere.",
      "Recognize yourself as the witness.",
      "Rest in silent observation.",
    ],
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
      "When the mind wanders, gently return.",
      "Feel the breath naturally.",
      "Observe impermanence in each breath.",
      "Remain calm and aware.",
    ],
  },

  {
    title: "Vipassana Body Scan",
    teacher: "Buddhist Tradition",
    minutes: 20,
    path: "Insight",
    intro: "Observe sensations with equanimity.",
    steps: [
      "Bring awareness to the head.",
      "Slowly move attention through the body.",
      "Observe sensations without reacting.",
      "Pleasant or unpleasant, remain balanced.",
      "Notice change in all sensations.",
      "End with whole-body awareness.",
    ],
  },

  {
    title: "Metta Bhavana",
    teacher: "Loving Kindness",
    minutes: 10,
    path: "Compassion",
    intro: "Cultivate goodwill toward yourself and others.",
    steps: [
      "Bring awareness to the heart.",
      "Silently repeat: May I be peaceful.",
      "Extend kindness toward others.",
      "Include loved ones.",
      "Include neutral people.",
      "Rest in compassion.",
    ],
  },

  {
    title: "Zazen",
    teacher: "Zen Tradition",
    minutes: 15,
    path: "Zen",
    intro: "Just sitting in direct awareness.",
    steps: [
      "Sit upright.",
      "Let breathing remain natural.",
      "Do not chase silence.",
      "Allow thoughts to come and go.",
      "Simply sit.",
      "Rest in presence.",
    ],
  },

  {
    title: "Koan Reflection",
    teacher: "Zen Tradition",
    minutes: 10,
    path: "Zen Inquiry",
    intro: "A contemplative inquiry beyond logic.",
    steps: [
      "Sit quietly.",
      "Bring one existential question into awareness.",
      "Do not answer mentally.",
      "Rest in not-knowing.",
      "Notice silence beneath thought.",
      "Remain open.",
    ],
  },

  {
    title: "Raja Yoga Dharana",
    teacher: "Swami Vivekananda",
    minutes: 9,
    path: "Concentration",
    intro: "Train attention through one-pointedness.",
    steps: [
      "Sit upright.",
      "Choose one object of focus.",
      "Bring attention back whenever it wanders.",
      "Do not become frustrated.",
      "Remain steady and alert.",
      "End with silence.",
    ],
  },

  {
    title: "Mantra Japa",
    teacher: "Yogic Tradition",
    minutes: 12,
    path: "Mantra",
    intro: "Use sacred sound to stabilize attention.",
    steps: [
      "Choose a mantra.",
      "Repeat it gently inwardly.",
      "Synchronize it with breathing.",
      "When distracted, return to the mantra.",
      "Allow repetition to become subtle.",
      "Rest in silence afterward.",
    ],
  },

  {
    title: "Yoga Nidra",
    teacher: "Tantric Yoga",
    minutes: 20,
    path: "Relaxation",
    intro: "Conscious deep relaxation.",
    steps: [
      "Lie down comfortably.",
      "Relax each body part slowly.",
      "Remain awake and aware.",
      "Observe the breath naturally.",
      "Allow the body to soften deeply.",
      "Return gently.",
    ],
  },

  {
    title: "Trataka",
    teacher: "Hatha Yoga",
    minutes: 7,
    path: "Focus",
    intro: "Candle gazing for concentration.",
    steps: [
      "Place a candle at eye level.",
      "Gaze softly without strain.",
      "Keep the body still.",
      "Close eyes when needed.",
      "Observe the inner image.",
      "Rest awareness inwardly.",
    ],
  },

  {
    title: "Ajapa Japa",
    teacher: "Breath Mantra",
    minutes: 10,
    path: "Breath Awareness",
    intro: "Observe breath with subtle mantra.",
    steps: [
      "Observe the inhale.",
      "Hear So mentally.",
      "Observe the exhale.",
      "Hear Ham mentally.",
      "Allow breath and mantra to merge.",
      "Rest in awareness.",
    ],
  },

  {
    title: "Pratyahara",
    teacher: "Patanjali Yoga",
    minutes: 10,
    path: "Sense Withdrawal",
    intro: "Withdraw attention inward.",
    steps: [
      "Observe outer sounds.",
      "Do not label them.",
      "Bring awareness inward.",
      "Notice the body.",
      "Notice the breath.",
      "Rest in inner stillness.",
    ],
  },

  {
    title: "Vigyan Bhairava Gap",
    teacher: "Kashmir Shaivism",
    minutes: 11,
    path: "Direct Awareness",
    intro: "Rest in the pause between breaths.",
    steps: [
      "Observe inhale.",
      "Notice the pause after inhale.",
      "Observe exhale.",
      "Notice the pause after exhale.",
      "Rest in the gap.",
      "Allow awareness to recognize itself.",
    ],
  },

  {
    title: "Walking Meditation",
    teacher: "Buddhist Tradition",
    minutes: 10,
    path: "Movement",
    intro: "Mindfulness through walking.",
    steps: [
      "Stand still first.",
      "Feel the feet touching the ground.",
      "Walk slowly.",
      "Observe each step consciously.",
      "Return attention whenever distracted.",
      "End standing quietly.",
    ],
  },
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

        <p>Awareness • Meditation • Contemplative Intelligence</p>
      </section>

      <nav className="tabs">
        <button onClick={() => setTab("home")}>Home</button>
        <button onClick={() => setTab("meditation")}>Meditation</button>
      </nav>

      {tab === "home" && (
        <section className="grid">
          <div className="card big">
            <h2>Choose Your Path</h2>

            <p>
              Explore authentic contemplative practices from Vedanta,
              Buddhism, Zen, Tantra, Yoga, and Mindfulness traditions.
            </p>
          </div>
        </section>
      )}

      {tab === "meditation" && !openedPractice && (
        <section className="methodList">
          <h2 className="sectionTitle">Meditation Methods</h2>

          <div className="practiceGrid">
            {practices.map((p) => (
              <button
                key={p.title}
                type="button"
                className="card practiceCard"
                onClick={() => setOpenedPractice(p)}
              >
                <span className="tag">{p.path}</span>

                <h3>{p.title}</h3>

                <small>{p.teacher}</small>

                <p>{p.intro}</p>

                <small>{p.minutes} min practice</small>
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
            ← Back to Methods
          </button>

          <div className="card big center premiumTimer">
            <span className="tag">{openedPractice.path}</span>

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

              <button className="secondary" onClick={restartTimer}>
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
```
