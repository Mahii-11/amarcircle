/*
  Text helpers for the chat's voice mode (Web Speech API).
  Kept free of React so they can be reused / tested on their own.
*/

export const VOICE_LANGS = [
  { code: "en-US", short: "EN", label: "English" },
  { code: "bn-BD", short: "বাং", label: "বাংলা" },
];

// Bangla letters only - excludes the ৳ currency sign and Bangla digits,
// which also show up in otherwise English replies.
const BANGLA_LETTERS_RE = /[ঀ-৥ৰৱ]/g;
const LATIN_LETTERS_RE = /[A-Za-z]/g;

// Pick the TTS language from the reply itself, so Bangla replies are read
// with a Bangla voice and English replies with an English one.
export const detectLang = (text) => {
  const bangla = (text.match(BANGLA_LETTERS_RE) ?? []).length;
  const latin = (text.match(LATIN_LETTERS_RE) ?? []).length;
  return bangla > latin ? "bn-BD" : "en-US";
};

// Turn the backend's lightweight markdown into something that sounds natural.
export const toSpeakableText = (text) =>
  String(text ?? "")
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold**
    .replace(/https?:\/\/\S+/g, "") // links read terribly
    .replace(/\p{Extended_Pictographic}/gu, "") // emojis
    .split("\n")
    .map((line) => line.replace(/^\s*[-*]\s+/, "").trim()) // "- list item"
    .filter(Boolean)
    // End each line with a pause so list items don't run together
    .map((line) => (/[.!?।:,]$/.test(line) ? line : `${line}.`))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

// Chrome silently stops long utterances (~15s), so speak in short chunks.
export const splitIntoChunks = (text, max = 180) => {
  const sentences = text.match(/[^.!?।]+[.!?।]*\s*/g) ?? [text];
  const chunks = [];
  let current = "";

  const push = (piece) => {
    if ((current + piece).length > max && current) {
      chunks.push(current.trim());
      current = "";
    }
    current += piece;
  };

  sentences.forEach((sentence) => {
    if (sentence.length <= max) return push(sentence);
    // A single very long sentence: break it on spaces instead
    sentence.split(/(\s+)/).forEach(push);
  });
  if (current.trim()) chunks.push(current.trim());
  return chunks;
};

// Best available voice for a language: exact match first, then same base
// language, preferring the higher quality "Natural" / "Google" / "Online" voices.
export const pickVoice = (voices, lang) => {
  const base = lang.split("-")[0];
  const candidates = voices.filter(
    (v) => v.lang === lang || v.lang.replace("_", "-").startsWith(`${base}-`) || v.lang === base
  );
  const byQuality = (v) => (/natural|google|online/i.test(v.name) ? 0 : 1);
  // The avatar is a girl, so prefer well-known female voices
  const byFemale = (v) =>
    /female|zira|aria|jenny|samantha|susan|hazel|karen|victoria|nabanita|tanishaa|google (us|uk) english|google.*bengali/i.test(
      v.name
    )
      ? 0
      : 1;
  return (
    candidates.sort(
      (a, b) =>
        (a.lang === lang ? 0 : 1) - (b.lang === lang ? 0 : 1) ||
        byFemale(a) - byFemale(b) ||
        byQuality(a) - byQuality(b)
    )[0] ?? null
  );
};
