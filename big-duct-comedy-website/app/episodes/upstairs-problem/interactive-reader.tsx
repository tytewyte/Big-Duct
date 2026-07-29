"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const panels = [
  {
    image: "/panel-01-service-call.png",
    alt: "Big Duct technician arriving at the homeowner's front door",
    scene: "The Service Call",
    sound: "Door knock · toolbox clink",
    dialogue: [
      {
        speaker: "HOMEOWNER",
        line: "Thank goodness you’re here. My downstairs feels fine, but my upstairs isn’t getting any action.",
      },
      {
        speaker: "TECH",
        line: "Don’t worry, ma’am. Big Duct specializes in neglected upper levels.",
      },
    ],
  },
  {
    image: "/panel-02-weak-airflow.png",
    alt: "Technician testing weak air from the upstairs bedroom vent",
    scene: "Testing the Bedroom Vent",
    sound: "Weak air puff · vent rattle",
    dialogue: [
      { speaker: "TECH", line: "Is this thing open all the way?" },
      {
        speaker: "HOMEOWNER",
        line: "Wide open. I can barely feel anything coming out.",
      },
      {
        speaker: "TECH",
        line: "That usually means somebody didn’t connect it properly.",
      },
    ],
  },
  {
    image: "/panel-03-attic-entry.png",
    alt: "Technician squeezing through a small attic access opening",
    scene: "Entering the Attic",
    sound: "Attic hatch creak · tool-belt clank",
    dialogue: [
      { speaker: "HOMEOWNER", line: "Are you sure you can fit through there?" },
      {
        speaker: "TECH",
        line: "Big Duct has worked its way into tighter spaces than this.",
      },
      { speaker: "TECH", line: "I didn’t say it was always graceful." },
    ],
  },
  {
    image: "/panel-04-loose-duct.png",
    alt: "Technician finding a flexible air duct disconnected in the attic",
    scene: "Finding the Problem",
    sound: "Metal pop · flexible duct crinkle",
    dialogue: [
      { speaker: "HOMEOWNER", line: "How does it look?" },
      {
        speaker: "TECH",
        line: "Somebody tried putting a six-inch piece into an eight-inch opening.",
      },
      { speaker: "HOMEOWNER", line: "Is that bad?" },
      {
        speaker: "TECH",
        line: "Only if you expected it to stay connected.",
      },
    ],
  },
  {
    image: "/panel-05-blower-chaos.png",
    alt: "Air duct inflating and tangling around the technician in the attic",
    scene: "Bad Timing",
    sound: "Blower starts · WHOOOOMP!",
    dialogue: [
      {
        speaker: "TECH",
        line: "I need to secure it before anybody turns the blower—",
      },
      { speaker: "SOUND", line: "WHOOOOMP!" },
      { speaker: "TECH", line: "WHO TURNED IT ON?!" },
      {
        speaker: "HOMEOWNER",
        line: "I thought you said you were ready!",
      },
    ],
  },
  {
    image: "/panel-06-grand-entrance.png",
    alt: "Technician tangled in ductwork on the bed after falling through the ceiling",
    scene: "The Grand Entrance",
    sound: "Ceiling crash · rushing air · drywall plop",
    dialogue: [
      {
        speaker: "HOMEOWNER",
        line: "Do all Big Duct technicians make an entrance like that?",
      },
      {
        speaker: "TECH",
        line: "Only when the attic can’t handle the pressure.",
      },
      {
        speaker: "HOMEOWNER",
        line: "That is the most air I’ve felt upstairs in years!",
      },
      { speaker: "TECH", line: "Another satisfied customer." },
    ],
  },
];

type WebkitWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

function tone(
  context: AudioContext,
  start: number,
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
  endFrequency?: number,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  }
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function noise(
  context: AudioContext,
  start: number,
  duration: number,
  volume: number,
  frequency: number,
  filterType: BiquadFilterType = "bandpass",
) {
  const buffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * duration),
    context.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = filterType;
  filter.frequency.value = frequency;
  filter.Q.value = 0.7;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.08, duration / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(start);
}

function playEffect(context: AudioContext, scene: number) {
  const now = context.currentTime + 0.03;

  switch (scene) {
    case 0:
      tone(context, now, 220, 0.12, 0.3, "triangle", 145);
      tone(context, now + 0.18, 190, 0.14, 0.32, "triangle", 125);
      tone(context, now + 0.4, 1200, 0.24, 0.18, "triangle", 520);
      break;
    case 1:
      noise(context, now, 0.7, 0.18, 1050, "lowpass");
      tone(context, now + 0.18, 380, 0.1, 0.12, "square");
      tone(context, now + 0.34, 310, 0.09, 0.1, "square");
      break;
    case 2:
      tone(context, now, 350, 0.62, 0.16, "sawtooth", 95);
      tone(context, now + 0.64, 1450, 0.18, 0.2, "triangle", 510);
      tone(context, now + 0.82, 980, 0.16, 0.17, "triangle", 390);
      break;
    case 3:
      tone(context, now, 1300, 0.2, 0.24, "triangle", 360);
      noise(context, now + 0.2, 0.58, 0.16, 1600, "highpass");
      break;
    case 4:
      tone(context, now, 120, 1.25, 0.16, "sawtooth", 190);
      noise(context, now, 1.18, 0.18, 820, "lowpass");
      noise(context, now + 0.88, 0.52, 0.34, 280, "lowpass");
      tone(context, now + 0.88, 145, 0.46, 0.33, "sine", 58);
      break;
    case 5:
      noise(context, now, 0.55, 0.38, 260, "lowpass");
      tone(context, now, 135, 0.55, 0.34, "sine", 52);
      noise(context, now + 0.24, 1.4, 0.2, 900, "bandpass");
      tone(context, now + 1.12, 480, 0.16, 0.2, "triangle", 170);
      break;
  }
}

export default function InteractiveReader() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [audioMessage, setAudioMessage] = useState(
    "Press Sound Off once to unlock scene audio.",
  );
  const audioContext = useRef<AudioContext | null>(null);
  const panel = panels[sceneIndex];

  const getAudio = useCallback(() => {
    if (!audioContext.current) {
      const Context =
        window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
      if (Context) audioContext.current = new Context();
    }
    return audioContext.current;
  }, []);

  const soundScene = useCallback(
    async (index: number) => {
      const context = getAudio();
      if (!context) {
        setAudioMessage("This browser does not support the sound system.");
        return false;
      }
      try {
        if (context.state === "suspended") await context.resume();
        if (context.state !== "running") {
          setAudioMessage("Audio is blocked. Tap the sound button once more.");
          return false;
        }
        playEffect(context, index);
        return true;
      } catch {
        setAudioMessage("Audio could not start. Tap the sound button once more.");
        return false;
      }
    },
    [getAudio],
  );

  const changeScene = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(panels.length - 1, index));
      setSceneIndex(nextIndex);
      if (soundOn) void soundScene(nextIndex);
    },
    [soundOn, soundScene],
  );

  const toggleSound = async () => {
    const nextValue = !soundOn;
    if (!nextValue) {
      setSoundOn(false);
      setAudioMessage("Sound is off.");
      return;
    }

    const context = getAudio();
    if (!context) {
      setAudioMessage("This browser does not support the sound system.");
      return;
    }

    try {
      if (context.state === "suspended") await context.resume();
      if (context.state !== "running") {
        setAudioMessage("Audio is blocked. Tap the sound button once more.");
        return;
      }

      const now = context.currentTime + 0.02;
      tone(context, now, 560, 0.16, 0.3, "sine");
      tone(context, now + 0.17, 760, 0.2, 0.32, "sine");
      setSoundOn(true);
      setAudioMessage("Sound check played. Scene effects are ready.");
      window.setTimeout(() => void soundScene(sceneIndex), 440);
    } catch {
      setAudioMessage("Audio could not start. Tap the sound button once more.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && sceneIndex < panels.length - 1) {
        changeScene(sceneIndex + 1);
      }
      if (event.key === "ArrowLeft" && sceneIndex > 0) {
        changeScene(sceneIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeScene, sceneIndex]);

  return (
    <section className="interactive-comic" aria-label="The Upstairs Problem comic">
      <div className="reader-toolbar">
        <div className="scene-progress">
          <span>
            Scene {sceneIndex + 1} of {panels.length}
          </span>
          <div className="progress-track">
            <i style={{ width: `${((sceneIndex + 1) / panels.length) * 100}%` }} />
          </div>
        </div>

        <button
          className={`sound-toggle ${soundOn ? "active" : ""}`}
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
        >
          <span aria-hidden="true">{soundOn ? "♪" : "×"}</span>
          {soundOn ? "Sound On" : "Sound Off"}
        </button>
      </div>
      <p className={`audio-message ${soundOn ? "ready" : ""}`} role="status">
        {audioMessage}
      </p>

      <article className="active-scene" key={panel.scene}>
        <div className="scene-heading">
          <span>{String(sceneIndex + 1).padStart(2, "0")}</span>
          <div>
            <p>Now playing</p>
            <h2>{panel.scene}</h2>
            <small>{soundOn ? panel.sound : "Turn sound on for this scene’s effects"}</small>
          </div>
        </div>

        <div className="scene-layout">
          <div className="active-panel-art">
            <img src={panel.image} alt={panel.alt} />
          </div>

          <div className="active-dialogue" aria-label={`Dialogue for ${panel.scene}`}>
            {panel.dialogue.map((item, dialogueIndex) => (
              <div
                className={`speech ${item.speaker.toLowerCase()}`}
                key={`${item.speaker}-${dialogueIndex}`}
              >
                <span>{item.speaker}</span>
                <p>{item.line}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="scene-controls">
        <button
          type="button"
          onClick={() => changeScene(sceneIndex - 1)}
          disabled={sceneIndex === 0}
        >
          <span aria-hidden="true">←</span>
          Previous Scene
        </button>

        <div className="scene-dots" aria-label="Choose a scene">
          {panels.map((item, index) => (
            <button
              type="button"
              className={index === sceneIndex ? "active" : ""}
              onClick={() => changeScene(index)}
              aria-label={`Scene ${index + 1}: ${item.scene}`}
              aria-current={index === sceneIndex ? "step" : undefined}
              key={item.scene}
            />
          ))}
        </div>

        <button
          className="next-scene"
          type="button"
          onClick={() => changeScene(sceneIndex + 1)}
          disabled={sceneIndex === panels.length - 1}
        >
          {sceneIndex === panels.length - 1 ? "Episode Complete" : "Next Scene"}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="keyboard-hint">Tip: use the left and right arrow keys to change scenes.</p>
    </section>
  );
}
