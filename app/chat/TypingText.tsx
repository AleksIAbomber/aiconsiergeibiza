"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;          // base (ms)
  startDelay?: number;     // pausa humana inicial
  cursor?: "none" | "dot"; // sin cursor o punto tipo ChatGPT
  onDone?: () => void;     // para avisar al ChatClient cuando termina
};

export default function TypingText({
  text,
  speed = 42,         // más lento por defecto (antes 24)
  startDelay = 420,   // pausa humana antes de escribir
  cursor = "dot",     // punto tipo ChatGPT
  onDone,
}: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    let intervalId: number | null = null;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setDisplayed((prev) => prev + text.charAt(i));
        i += 1;

        if (i >= text.length) {
          if (intervalId) window.clearInterval(intervalId);
          intervalId = null;
          onDone?.();
        }
      }, speed + Math.floor(Math.random() * 18)); // micro-variación “humana”
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <span className="typing-text">
      {displayed}
      {cursor === "dot" ? <span className="cursorDot" aria-hidden="true" /> : null}
    </span>
  );
}