"use client";

import { LANGS, Lang } from "./i18n";

type Props = {
  lang: Lang;
  onChange: (l: Lang) => void;
  compact?: boolean;
};

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
