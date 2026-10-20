import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Loader2,
  MapPin,
  Mic,
  Phone,
  PhoneOff,
  Sparkles,
  Plus,
  RotateCcw,
  Send,
  ShoppingBag,
  Square,
  User,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import { fetchData, sendAIChatMessage, confirmAIChatOrder, cancelAIChatOrder } from "../services/chatApi";
import ChatHistorySkeleton from "./ChatHistorySkeleton";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import { VOICE_LANGS } from "../utils/speech";
import GirlAvatar from "./GirlAvatar";
import GirlPortrait from "./GirlPortrait";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

// TODO: replace with your real "confirm pending order" endpoint / payload.
// Assumed here: POST /ai-chat/confirm  { token, session_id }
// Replace the fake confirm endpoint with your real backend route
const CONFIRM_ENDPOINT = "/ai-chat/order/confirm"; // Update this if your actual route differs

const defaultConfirmOrder = ({ token, sessionId }) =>
  fetchData(
    CONFIRM_ENDPOINT,
    { 
      method: "POST", 
      body: { token, session_id: sessionId } 
    },
    true
  );

const SESSION_KEY = "ai_chat_session_id";
const VOICE_REPLIES_KEY = "ai_chat_voice_replies";
const VOICE_LANG_KEY = "ai_chat_voice_lang";

const SUGGESTIONS = [
  "What internet packages do you offer?",
  "How can I pay my bill?",
  "I want a new connection",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createSessionId = () => `web-${uid()}`;

const getInitialSessionId = () => {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) return saved;
    const fresh = createSessionId();
    localStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return createSessionId();
  }
};

const readSetting = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

const saveSetting = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable - setting just lives in memory */
  }
};

const formatTime = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const money = (value, currency = "") =>
  `${currency}${Number(value ?? 0).toFixed(2)}`;

// Removes the pending-order card from every message
const stripPending = (list) =>
  list.map((m) => (m.pendingOrder ? { ...m, pendingOrder: undefined } : m));

/* Tiny renderer for the **bold** and "- list item" text the backend sends */
const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.length > 4 && part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );

const FormattedText = ({ text }) => {
  const blocks = [];
  let list = [];

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-1 list-disc space-y-0.5 pl-5">
        {list}
      </ul>
    );
    list = [];
  };

  String(text ?? "")
    .split("\n")
    .forEach((line, i) => {
      const item = line.match(/^\s*[-*]\s+(.*)$/);
      if (item) {
        list.push(<li key={i}>{renderInline(item[1])}</li>);
        return;
      }
      flushList();
      if (line.trim() === "") {
        blocks.push(<div key={`sp-${i}`} className="h-2" />);
      } else {
        blocks.push(<p key={i}>{renderInline(line)}</p>);
      }
    });
  flushList();

  return <div className="space-y-0.5 break-words">{blocks}</div>;
};

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                     */
/* ------------------------------------------------------------------ */

const Avatar = ({ isUser = false, speaking = false }) =>
  isUser ? (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6dcff] text-[#3510B8]">
      <User className="h-4 w-4" />
    </div>
  ) : (
    <GirlAvatar size={32} speaking={speaking} />
  );

/* Voice-only reply: the assistant "talks" instead of showing text */
const BAR_HEIGHTS = [6, 12, 8, 16, 10, 18, 8, 14, 6, 12, 16, 8, 12, 6];

const VoiceReplyBubble = ({ isSpeaking, onToggle, text }) => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isSpeaking ? "Stop voice reply" : "Play voice reply"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3510B8] text-white transition hover:bg-[#2a0f8f]"
        >
          {isSpeaking ? <Square className="h-3 w-3 fill-current" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <span className="flex h-5 items-center gap-[3px]" aria-hidden="true">
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full bg-[#3510B8] ${isSpeaking ? "animate-pulse" : "opacity-40"}`}
              style={{ height: h, animationDelay: `${i * 70}ms` }}
            />
          ))}
        </span>
        <span className="text-xs text-gray-500">{isSpeaking ? "Speaking..." : "Voice reply"}</span>
      </div>
      <button
        type="button"
        onClick={() => setShowText((v) => !v)}
        className="text-[11px] font-medium text-[#3510B8] hover:underline"
      >
        {showText ? "Hide text" : "Show text"}
      </button>
      {showText && <FormattedText text={text} />}
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-2.5">
    <Avatar />
    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3510B8]"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
      <span className="text-xs text-gray-500">AI is typing...</span>
    </div>
  </div>
);

/* Mic button next to Send: tap to talk, tap again to stop and send */
const VoiceInputButton = ({ isListening, disabled, onStart, onStop }) => (
  <button
    type="button"
    onClick={isListening ? onStop : onStart}
    disabled={disabled && !isListening}
    aria-label={isListening ? "Stop recording and send" : "Speak your message"}
    title={isListening ? "Stop & send" : "Voice message"}
    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
      isListening
        ? "bg-[#3510B8] text-white"
        : "text-gray-500 hover:bg-[#F0E7FF] hover:text-[#3510B8]"
    }`}
  >
    {isListening && (
      <span className="absolute inset-0 animate-ping rounded-full bg-[#5b3df0]/40" />
    )}
    {isListening ? (
      <Square className="relative h-3.5 w-3.5 fill-current" />
    ) : (
      <Mic className="h-4 w-4" />
    )}
  </button>
);

/* Small "Listen / Stop" control under an assistant message */
const SpeakButton = ({ isSpeaking, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isSpeaking ? "Stop reading" : "Read aloud"}
    title={isSpeaking ? "Stop" : "Listen"}
    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] transition ${
      isSpeaking ? "text-[#3510B8]" : "text-gray-400 hover:text-[#3510B8]"
    }`}
  >
    {isSpeaking ? (
      <>
        <VolumeX className="h-3 w-3" />
        Stop
      </>
    ) : (
      <Volume2 className="h-3 w-3" />
    )}
  </button>
);

/* Video-call style screen: only her face, big and centred. Nothing else. */
const CallScreen = ({ speaking, listening, thinking, error, onEnd }) => {
  const status = error || (speaking ? "" : thinking ? "Thinking..." : listening ? "Listening..." : "");
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-3 bg-gradient-to-b from-[#F0E7FF] to-white px-4 py-4">
      <div
        className={`min-h-0 w-full flex-1 overflow-hidden rounded-3xl shadow-lg transition-shadow duration-300 ${
          listening
            ? "ring-4 ring-emerald-400/60"
            : speaking
            ? "ring-4 ring-[#8b5cf6]/60"
            : "ring-1 ring-[#d9c7ff]"
        }`}
      >
        <GirlPortrait speaking={speaking} className="h-full w-full rounded-3xl" />
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <p
          role={error ? "alert" : "status"}
          className={`min-w-[88px] text-center text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {status}
        </p>
        <button
          type="button"
          onClick={onEnd}
          aria-label="End call"
          title="End call"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const PendingOrderCard = ({ order, onConfirm, onCancel, isConfirming, isCancelling, error }) => {
  const currency = order.currency ?? "";

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#d9c7ff] bg-white shadow-sm">
      <div className="flex items-center gap-2 bg-[#3510B8] px-4 py-2.5 text-white">
        <ShoppingBag className="h-4 w-4" />
        <h4 className="text-sm font-semibold">Request Summary</h4>
        <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
          Pending
        </span>
      </div>

      <div className="space-y-3 p-4 text-sm">
        {/* Customer details */}
        <div className="space-y-1.5 text-gray-700">
          <p className="flex items-center gap-2">
            <User className="h-4 w-4 shrink-0 text-[#3510B8]" />
            <span className="font-medium text-gray-900">{order.name}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-[#3510B8]" />
            <span>{order.phone}</span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#3510B8]" />
            <span>{order.address}</span>
          </p>
        </div>

        {/* Items */}
        <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
          {(order.items ?? []).map((item, i) => (
            <li
              key={`${item.product_id}-${item.size_id ?? "none"}-${i}`}
              className="flex items-start justify-between gap-3 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900">
                  {item.product}
                  {item.size && (
                    <span className="ml-1.5 rounded bg-[#F0E7FF] px-1.5 py-0.5 text-[11px] font-medium text-[#3510B8]">
                      {item.size}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {item.qty} × {money(item.unit_price, currency)}
                </p>
              </div>
              <span className="shrink-0 font-semibold text-gray-900">
                {money(item.line_total, currency)}
              </span>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div className="space-y-1 border-t border-dashed border-gray-200 pt-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{money(order.subtotal, currency)}</span>
          </div>
          <div className="flex justify-button text-gray-600">
            <span>Shipping</span>
            <span>{money(order.shipping_cost, currency)}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-bold text-[#3510B8]">
            <span>Total</span>
            <span>{money(order.total, currency)}</span>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </p>
        )}

        {/* Buttons: Cancel and Confirm */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => onCancel(order)}
            disabled={isConfirming || isCancelling}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isCancelling ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Cancel"
            )}
          </button>

          <button
            type="button"
            onClick={() => onConfirm(order)}
            disabled={isConfirming || isCancelling}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#3510B8] px-2 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#2a0f8f] focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Confirm Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

const AIChat = ({
  title = "Amar Circle Assistant",
  confirmOrder = defaultConfirmOrder, // override to plug in your own confirm call
  className = "mx-auto h-[100dvh] max-w-3xl sm:my-6 sm:h-[calc(100dvh-3rem)] sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-xl",
  isOpen = true, // ChatWidget passes false when hidden, so voice stops
  onClose, // when given, a close (X) button shows in the header
}) => {
  const [sessionId, setSessionId] = useState(getInitialSessionId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [confirmingToken, setConfirmingToken] = useState(null);
  const [cancellingToken, setCancellingToken] = useState(null);
  const [confirmError, setConfirmError] = useState("");
  // Voice mode: when on, every reply is read aloud. Replies to a spoken
  // message are always read aloud, even in text mode (like ChatGPT voice).
  const [voiceReplies, setVoiceReplies] = useState(
    () => readSetting(VOICE_REPLIES_KEY, "off") === "on"
  );
  const [voiceLang, setVoiceLang] = useState(() =>
    readSetting(VOICE_LANG_KEY, VOICE_LANGS[0].code)
  );

  const [inCall, setInCall] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const tts = useSpeechSynthesis();
  const stt = useSpeechRecognition({
    lang: voiceLang,
    onResult: (text) => {
      // A reply is still loading: keep the words in the box instead of losing them
      if (isTyping || isHistoryLoading) setInput(text);
      else sendMessage(text, { viaVoice: true });
    },
  });
  const { cancel: cancelSpeech } = tts;
  const { cancel: cancelListening } = stt;

  /* ---- Load history on mount / when the session changes ---- */
  useEffect(() => {
    let cancelled = false;
    setIsHistoryLoading(true);

    (async () => {
      try {
        // raw: true, because the default normalizer drops the top-level
        // `pending_order` that the history endpoint returns next to `data`.
        const raw = await fetchData(
          `/ai-chat/history?session_id=${encodeURIComponent(sessionId)}`,
          { raw: true },
          true
        );
        if (cancelled) return;

        const history = (Array.isArray(raw?.data) ? raw.data : []).map((m) => ({
          id: uid(),
          role: m.role,
          content: m.content,
          created_at: m.created_at,
        }));

        if (raw?.pending_order) {
          for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].role === "assistant") {
              history[i].pendingOrder = raw.pending_order;
              break;
            }
          }
        }
        setMessages(history);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        if (!cancelled) setIsHistoryLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  /* ---- Auto-scroll to the bottom ---- */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, isHistoryLoading, confirmError, stt.error]);

  /* ---- Stop talking / listening when the widget is closed ---- */
  useEffect(() => {
    if (isOpen) return;
    cancelSpeech();
    cancelListening();
  }, [isOpen, cancelSpeech, cancelListening]);

  /* ---- Voice call: after she finishes talking, listen again (like a real call) ---- */
  const { start: startListening } = stt;
  useEffect(() => {
    if (!inCall || !isOpen) return;
    if (stt.isListening || tts.speakingId || isTyping || isHistoryLoading || stt.error) return;
    const t = setTimeout(startListening, 500);
    return () => clearTimeout(t);
  }, [inCall, isOpen, stt.isListening, stt.error, tts.speakingId, isTyping, isHistoryLoading, startListening]);

  useEffect(() => {
    if (!isOpen) setInCall(false);
  }, [isOpen]);

  /* ---- Auto-grow textarea ---- */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  /* ---- Ask the backend for a reply ---- */
  const { speak } = tts;
  const requestReply = useCallback(
    async (text, { speakReply = false, voiceOnly = false } = {}) => {
      setIsTyping(true);
      try {
        const data = await sendAIChatMessage({
          message: text,
          session_id: sessionId,
        });

        const reply = data?.message;
        const pendingKeyPresent =
          !!data && Object.prototype.hasOwnProperty.call(data, "pending_order");
        const pendingOrder = data?.pending_order || undefined;
        const replyMessage = {
          id: uid(),
          role: reply?.role ?? "assistant",
          content:
            reply?.content ||
            (pendingOrder ? "" : "Sorry, I couldn't generate a reply."),
          created_at: reply?.created_at ?? new Date().toISOString(),
          pendingOrder,
          // Spoken question -> spoken answer (no text bubble); needs real content
          voiceOnly: voiceOnly && !!reply?.content,
        };

        setMessages((prev) => {
          // A new (or explicitly cleared) pending order replaces any old card,
          // so an outdated "Confirm" button can never be clicked.
          const base = pendingKeyPresent ? stripPending(prev) : prev;
          return [...base, replyMessage];
        });

        if (speakReply) speak(replyMessage.content, replyMessage.id);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            isError: true,
            content: err?.message || "Something went wrong. Please try again.",
            retryText: text,
            created_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, speak]
  );

  const sendMessage = async (text, { viaVoice = false } = {}) => {
    const content = text.trim();
    if (!content || isTyping || isHistoryLoading) return;

    cancelSpeech(); // don't talk over the new question
    setInput("");
    setConfirmError("");
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "user",
        content,
        created_at: new Date().toISOString(),
      },
    ]);
    await requestReply(content, {
      speakReply: viaVoice || voiceReplies,
      voiceOnly: viaVoice && tts.isSupported,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send while recording = stop recording; the transcript is sent from onResult
    if (stt.isListening) return stt.stop();
    sendMessage(input);
  };

  /* ---- Voice controls ---- */
  const handleStartListening = () => {
    cancelSpeech();
    tts.prime(); // unlock auto-play of the spoken reply (iOS)
    stt.clearError();
    setInCall(true);
    stt.start();
  };

  const handleEndCall = () => {
    setInCall(false);
    cancelSpeech();
    cancelListening();
    stt.clearError();
  };

  const toggleVoiceReplies = () => {
    const next = !voiceReplies;
    setVoiceReplies(next);
    saveSetting(VOICE_REPLIES_KEY, next ? "on" : "off");
    if (next) tts.prime();
    else cancelSpeech();
  };

  const toggleVoiceLang = () => {
    const index = VOICE_LANGS.findIndex((l) => l.code === voiceLang);
    const next = VOICE_LANGS[(index + 1) % VOICE_LANGS.length].code;
    setVoiceLang(next);
    saveSetting(VOICE_LANG_KEY, next);
  };

  const handleSpeakMessage = (msg) => {
    if (tts.speakingId === msg.id) return cancelSpeech();
    tts.speak(msg.content, msg.id);
  };

  const handleKeyDown = (e) => {
    // Enter sends, Shift+Enter = new line. Ignore Enter while an IME
    // (e.g. Bangla keyboard) is composing text.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleRetry = (msg) => {
    if (isTyping) return;
    setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    requestReply(msg.retryText, { speakReply: voiceReplies });
  };

  /* ---- Confirm pending order ---- */
  const handleConfirm = async (order) => {
    if (confirmingToken) return;
    setConfirmingToken(order.token);
    setConfirmError("");

    try {
      const res = await confirmOrder({
        order,
        token: order.token,
        sessionId,
      });

      const text =
        res?.message?.content ??
        (typeof res?.message === "string" ? res.message : null) ??
        (res?.invoice_no
          ? `Your request has been submitted! Reference: ${res.invoice_no}`
          : "Your request has been confirmed! 🎉");

      setMessages((prev) => [
        ...stripPending(prev),
        {
          id: uid(),
          role: "assistant",
          content: text,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setConfirmError(
        err?.message || "Could not confirm the request. Please try again."
      );
    } finally {
      setConfirmingToken(null);
    }
  };

const handleCancel = async (order) => {
    if (cancellingToken) return;
    setCancellingToken(order.token);
    setConfirmError("");

    try {
      // Ekhane confirmAIChatOrder use korben ebong session_id pass korben
      const res = await cancelAIChatOrder({
        token: order.token,
        session_id: sessionId, 
        action: "cancel",      
      });

      const text =
        res?.message?.content ??
        (typeof res?.message === "string" ? res.message : null) ??
        "Your request has been cancelled.";

      setMessages((prev) => [
        ...stripPending(prev),
        {
          id: uid(),
          role: "assistant",
          content: text,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setConfirmError(
        err?.message || "Could not cancel the request. Please try again."
      );
    } finally {
      setCancellingToken(null);
    }
  };
  /* ---- Start a fresh conversation ---- */
  const handleNewChat = () => {
    if (isTyping) return;
    cancelSpeech();
    cancelListening();
    const fresh = createSessionId();
    try {
      localStorage.setItem(SESSION_KEY, fresh);
    } catch {
      /* storage unavailable - session just lives in memory */
    }
    setMessages([]);
    setInput("");
    setConfirmError("");
    setSessionId(fresh);
  };

  const canSend = stt.isListening
    ? stt.transcript.length > 0
    : input.trim().length > 0 && !isTyping && !isHistoryLoading;
  const currentLang = VOICE_LANGS.find((l) => l.code === voiceLang) ?? VOICE_LANGS[0];
  const showEmptyState = !isHistoryLoading && messages.length === 0 && !isTyping;

  return (
    <div className={`relative flex w-full flex-col overflow-hidden bg-white ${className}`}>
      {/* Header */}
      <header className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-[#3510B8] to-[#2563EB] px-4 py-3.5 text-white shadow">
        <GirlAvatar size={44} speaking={!!tts.speakingId} className="ring-2 ring-white/40 rounded-full" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold leading-tight">
            {title}
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-[#e6dcff]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Online · Ask about our packages or support
          </p>
        </div>
        {tts.isSupported && (
          <button
            type="button"
            onClick={toggleVoiceReplies}
            aria-pressed={voiceReplies}
            title={voiceReplies ? "Voice replies on" : "Voice replies off"}
            aria-label={voiceReplies ? "Turn off voice replies" : "Turn on voice replies"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
              voiceReplies ? "bg-white text-[#3510B8] hover:bg-[#F0E7FF]" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {voiceReplies ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={handleNewChat}
          disabled={isTyping}
          title="New chat"
          aria-label="Start a new chat"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            title="Close chat"
            aria-label="Close chat"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={`flex-1 space-y-4 overflow-y-auto bg-white px-3 py-4 sm:px-5 ${inCall ? "hidden" : ""}`}
      >
        {isHistoryLoading && <ChatHistorySkeleton />}

        {showEmptyState && (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E7FF] text-[#3510B8]">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              How can I help you today?
            </h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Ask about our internet packages, pricing, bill payment or get a new connection right here in the
              chat.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-[#d9c7ff] px-3.5 py-1.5 text-xs font-medium text-[#3510B8] transition hover:bg-[#F0E7FF]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const bubble = isUser
            ? "rounded-2xl rounded-br-md bg-[#3510B8] text-white shadow-sm"
            : msg.isError
            ? "rounded-2xl rounded-bl-md border border-red-200 bg-red-50 text-red-700"
            : "rounded-2xl rounded-bl-md bg-gray-100 text-gray-800";

          return (
            <div key={msg.id} className="space-y-2">
              {(msg.content || !msg.pendingOrder) && (
                <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
                  <Avatar isUser={isUser} speaking={tts.speakingId === msg.id} />
                  <div
                    className={`flex min-w-0 max-w-[85%] flex-col sm:max-w-[75%] ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div className={`px-4 py-2.5 text-sm ${bubble}`}>
                      {isUser ? (
                        <p className="whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      ) : msg.voiceOnly ? (
                        <VoiceReplyBubble
                          text={msg.content}
                          isSpeaking={tts.speakingId === msg.id}
                          onToggle={() => handleSpeakMessage(msg)}
                        />
                      ) : (
                        <FormattedText text={msg.content} />
                      )}
                    </div>

                    {msg.isError && (
                      <button
                        type="button"
                        onClick={() => handleRetry(msg)}
                        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#3510B8] hover:underline"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Retry
                      </button>
                    )}

                    <div className="mt-1 flex items-center gap-1 px-1">
                      <span className="text-[11px] text-gray-400">
                        {formatTime(msg.created_at)}
                      </span>
                      {tts.isSupported && !isUser && !msg.isError && !msg.voiceOnly && msg.content && (
                        <SpeakButton
                          isSpeaking={tts.speakingId === msg.id}
                          onClick={() => handleSpeakMessage(msg)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pending order summary, right below the message */}
              {msg.pendingOrder && (
                <div className="pl-[42px]">
                  <PendingOrderCard
                    order={msg.pendingOrder}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    isConfirming={confirmingToken === msg.pendingOrder.token}
                    isCancelling={cancellingToken === msg.pendingOrder.token}
                    error={confirmError}
                  />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && <TypingIndicator />}
      </div>

      {inCall && (
        <CallScreen
          speaking={tts.isSounding}
          listening={stt.isListening}
          thinking={isTyping}
          error={stt.error}
          onEnd={handleEndCall}
        />
      )}

      {/* Sticky input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white px-3 py-2 transition focus-within:border-[#3510B8] focus-within:ring-2 focus-within:ring-[#3510B8]/20">
          <textarea
            ref={inputRef}
            rows={1}
            value={stt.isListening ? stt.transcript : input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={stt.isListening}
            placeholder={
              stt.isListening
                ? `Listening (${currentLang.label})...`
                : "Type your message..."
            }
            className={`max-h-[120px] min-w-0 flex-1 resize-none bg-transparent py-1.5 text-base text-gray-900 outline-none sm:text-sm ${
              stt.isListening ? "placeholder-[#5b3df0]" : "placeholder-gray-400"
            }`}
          />
          {stt.isSupported && (
            <>
              <button
                type="button"
                onClick={toggleVoiceLang}
                disabled={stt.isListening}
                title={`Voice input language: ${currentLang.label}`}
                aria-label={`Voice input language: ${currentLang.label}. Click to change.`}
                className="mb-1.5 shrink-0 rounded-full border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-500 transition hover:border-[#d9c7ff] hover:text-[#3510B8] disabled:opacity-50"
              >
                {currentLang.short}
              </button>
              <VoiceInputButton
                isListening={stt.isListening}
                disabled={isTyping || isHistoryLoading}
                onStart={handleStartListening}
                onStop={stt.stop}
              />
            </>
          )}
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3510B8] text-white transition hover:bg-[#2a0f8f] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        {stt.error ? (
          <p role="alert" className="mt-1.5 text-center text-[11px] text-red-600">
            {stt.error}
          </p>
        ) : stt.isListening ? (
          <p className="mt-1.5 text-center text-[11px] text-[#3510B8]">
            Speak now · it sends automatically when you pause
          </p>
        ) : (
          <p className="mt-1.5 hidden text-center text-[11px] text-gray-400 sm:block">
            Press Enter to send · Shift + Enter for a new line
          </p>
        )}
      </form>
    </div>
  );
};

export default AIChat;