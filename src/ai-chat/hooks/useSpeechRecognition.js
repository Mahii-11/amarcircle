import { useCallback, useEffect, useRef, useState } from "react";

/*
  Voice input (speech -> text) using the browser's SpeechRecognition API.
  Supported in Chrome, Edge, Safari and most Android browsers; not in Firefox,
  where `isSupported` is false and the mic button should be hidden.
  Needs HTTPS (or localhost) for microphone access.

  onResult(text) is called once, when the user stops talking (or presses stop).
*/

const getRecognitionCtor = () =>
  typeof window === "undefined"
    ? null
    : window.SpeechRecognition || window.webkitSpeechRecognition || null;

const ERROR_MESSAGES = {
  "not-allowed": "Microphone access is blocked. Please allow it in your browser settings.",
  "service-not-allowed": "Voice input isn't available in this browser. Please type your message.",
  "audio-capture": "No microphone was found on this device.",
  network: "Voice input needs an internet connection.",
  "language-not-supported": "This language isn't supported for voice input in your browser.",
  "bad-grammar": "Voice input failed. Please try again.",
};

const INSECURE_MESSAGE = "Voice input only works on a secure (https://) connection.";
const POLICY_MESSAGE =
  "Voice input is disabled by this site's settings (Permissions-Policy). Please type your message.";

// False when the page's Permissions-Policy header (or an iframe without
// allow="microphone") disables the mic. The browser then rejects every request
// with "not-allowed" without showing a prompt, so the user can't fix it.
const micAllowedByPolicy = () => {
  if (typeof document === "undefined") return true;
  const policy = document.permissionsPolicy || document.featurePolicy;
  try {
    return policy?.allowsFeature ? policy.allowsFeature("microphone") : true;
  } catch {
    return true;
  }
};

// Explain a "not-allowed" error: server policy, insecure page, or the user's
// own browser setting (only the last one can be fixed by the user).
const notAllowedMessage = (permissionState) => {
  if (typeof window !== "undefined" && !window.isSecureContext) return INSECURE_MESSAGE;
  if (!micAllowedByPolicy()) return POLICY_MESSAGE;
  if (permissionState === "denied")
    return "Microphone access is blocked for this site. Click the lock icon in the address bar and allow the microphone.";
  return ERROR_MESSAGES["not-allowed"];
};

export default function useSpeechRecognition({ lang = "en-US", onResult } = {}) {
  const [isSupported] = useState(() => !!getRecognitionCtor());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const textRef = useRef(""); // final + latest interim text
  const cancelledRef = useRef(false);
  const onResultRef = useRef(onResult);

  const permissionRef = useRef("unknown"); // "granted" | "denied" | "prompt" | "unknown"

  useEffect(() => {
    onResultRef.current = onResult;
  });

  // Track the mic permission in the background, so start() never has to await
  // it: an await before rec.start() can lose the click's user activation.
  useEffect(() => {
    let status;
    let cancelled = false;
    const update = () => {
      permissionRef.current = status.state;
    };
    navigator.permissions
      ?.query({ name: "microphone" })
      .then((s) => {
        if (cancelled) return;
        status = s;
        update();
        status.addEventListener("change", update);
      })
      .catch(() => {}); // Firefox / older Safari don't support "microphone" here
    return () => {
      cancelled = true;
      status?.removeEventListener("change", update);
    };
  }, []);

  // Called directly from the mic button's click handler; stays synchronous.
  const start = useCallback(() => {
    const Recognition = getRecognitionCtor();
    if (!Recognition || recognitionRef.current) return;

    if (!window.isSecureContext) {
      console.error("[voice] Page is not a secure context:", window.location.origin);
      setError(INSECURE_MESSAGE);
      return;
    }
    if (!micAllowedByPolicy()) {
      console.error(
        "[voice] Microphone disabled by Permissions-Policy. Allow it on the server, e.g. " +
          '`Permissions-Policy: microphone=(self)`.'
      );
      setError(POLICY_MESSAGE);
      return;
    }

    const rec = new Recognition();
    rec.lang = lang;
    rec.interimResults = true; // live transcript while speaking
    rec.continuous = false; // stop automatically after a pause
    rec.maxAlternatives = 1;

    let finalText = "";
    textRef.current = "";
    cancelledRef.current = false;
    setTranscript("");
    setError("");

    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interim += result[0].transcript;
      }
      textRef.current = `${finalText}${interim}`.trim();
      setTranscript(textRef.current);
    };

    rec.onerror = (e) => {
      // "aborted" = we cancelled it, "no-speech" = user said nothing
      if (e.error === "aborted" || e.error === "no-speech") return;
      console.error("[voice] SpeechRecognition error:", e.error, e.message || "", {
        secureContext: window.isSecureContext,
        policyAllowsMic: micAllowedByPolicy(),
        permission: permissionRef.current,
      });
      setError(
        e.error === "not-allowed"
          ? notAllowedMessage(permissionRef.current)
          : ERROR_MESSAGES[e.error] || `Voice input failed (${e.error}). Please try again.`
      );
    };

    rec.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
      setTranscript("");
      const text = textRef.current;
      textRef.current = "";
      if (!cancelledRef.current && text) onResultRef.current?.(text);
    };

    recognitionRef.current = rec;
    try {
      rec.start();
      setIsListening(true);
    } catch (err) {
      console.error("[voice] recognition.start() threw:", err);
      recognitionRef.current = null;
      setError("Could not start the microphone. Please try again.");
    }
  }, [lang]);

  // Stop listening and deliver what was heard
  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  // Stop listening and throw the result away
  const cancel = useCallback(() => {
    cancelledRef.current = true;
    recognitionRef.current?.abort();
  }, []);

  const clearError = useCallback(() => setError(""), []);

  useEffect(
    () => () => {
      cancelledRef.current = true;
      recognitionRef.current?.abort();
    },
    []
  );

  return { isSupported, isListening, transcript, error, start, stop, cancel, clearError };
}
