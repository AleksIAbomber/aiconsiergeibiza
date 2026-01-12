"use client";

import type { Lang } from "./i18n";

type Props = {
  lang: Lang;
  onChange: (l: Lang) => void;
  compact?: boolean;
};

const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "nl", label: "NL" },
];

export default function LanguagePicker({ lang, onChange, compact }: Props) {
  return (
    <div className={`langRow ${compact ? "langRowCompact" : ""}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`pill ${lang === l.code ? "pillActive" : ""}`}
          onClick={() => {
            localStorage.setItem("aiconsierge_lang", l.code);
            onChange(l.code);
          }}
          type="button"
          aria-label={`Language ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}