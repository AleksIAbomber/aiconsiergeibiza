"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
};

export default function TypingText({ text, speed = 24 }: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;

        if (i >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, 400); // pausa humana antes de escribir

    return () => clearTimeout(start);
  }, [text, speed]);

  return (
    <span className="typing-text">
      {displayed}
      <span className="cursor" />
    </span>
  );
}