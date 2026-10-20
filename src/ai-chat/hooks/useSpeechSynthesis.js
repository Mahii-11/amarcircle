import { useCallback, useEffect, useRef, useState } from "react";
import { detectLang, pickVoice, splitIntoChunks, toSpeakableText } from "../utils/speech";

/*
  Voice output (text -> speech) using the browser's speechSynthesis API.
  speak(text, id) reads a reply aloud; `speakingId` tells the UI which
  message is currently being read so it can show a stop button.
*/

const getSynth = () =>
  typeof window !== "undefined" && "speechSynthesis" in window && window.SpeechSynthesisUtterance
    ? window.speechSynthesis
    : null;

export default function useSpeechSynthesis({ rate = 1 } = {}) {
  const [synth] = useState(getSynth);
  const [speakingId, setSpeakingId] = useState(null);
  // true only while sound is really coming out (speakingId is set earlier, while the voice is still loading)
  const [isSounding, setIsSounding] = useState(false);
  const voicesRef = useRef([]);
  const runRef = useRef(0); // ignores callbacks from utterances we already cancelled

  // Voices load asynchronously in Chrome, so listen for "voiceschanged"
  useEffect(() => {
    if (!synth) return;
    const loadVoices = () => {
      voicesRef.current = synth.getVoices();
    };
    loadVoices();
    synth.addEventListener?.("voiceschanged", loadVoices);
    return () => {
      synth.removeEventListener?.("voiceschanged", loadVoices);
      synth.cancel();
    };
  }, [synth]);

  const cancel = useCallback(() => {
    runRef.current += 1;
    synth?.cancel();
    setSpeakingId(null);
    setIsSounding(false);
  }, [synth]);

  const speak = useCallback(
    (text, id = "tts") => {
      if (!synth) return;
      const clean = toSpeakableText(text);
      if (!clean) return;

      synth.cancel();
      const run = ++runRef.current;
      const lang = detectLang(clean);
      const voice = pickVoice(voicesRef.current, lang);
      const chunks = splitIntoChunks(clean);

      const done = () => {
        if (runRef.current === run) {
          setSpeakingId(null);
          setIsSounding(false);
        }
      };

      chunks.forEach((chunk, i) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = voice?.lang ?? lang;
        if (voice) utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = 1.15; // a little higher, friendlier girl voice
        utterance.onerror = done;
        if (i === 0) {
          utterance.onstart = () => {
            if (runRef.current === run) setIsSounding(true);
          };
        }
        if (i === chunks.length - 1) utterance.onend = done;
        synth.speak(utterance);
      });
      setSpeakingId(id);
    },
    [synth, rate]
  );

  // iOS Safari only allows speech that starts inside a user gesture. Calling
  // this from a click "unlocks" it so later replies can be spoken automatically.
  const prime = useCallback(() => {
    if (!synth || synth.speaking) return;
    const silent = new SpeechSynthesisUtterance(" ");
    silent.volume = 0;
    synth.speak(silent);
  }, [synth]);

  return { isSupported: !!synth, speakingId, isSounding, speak, cancel, prime };
}
