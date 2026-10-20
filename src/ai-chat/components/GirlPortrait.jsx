import { useEffect, useRef, useState } from "react";

/*
  Assistant "video call" portrait.

  Real lip-sync can't be faked well on a still photo, so this plays two short
  looping videos of HER (made from the same photo with an AI talking-head tool):
    /videos/assistant-idle.mp4  - listening: breathing, blinking, small smile
    /videos/assistant-talk.mp4  - speaking: natural head + lip movement
  The talking clip shows while a reply is being spoken, the idle clip otherwise.
  Until those files exist (or if one fails to load) the plain photo is shown
  with a gentle breathing motion, so nothing breaks.

  Video tips: portrait 9:16 (same framing as assistant.jpg), 8-15 s, muted,
  first and last frame matching so the loop is seamless, H.264 mp4, under ~3 MB.
*/
import PHOTO from "../assets/assistant.jpg";
import IDLE_VIDEO from "../assets/assistant-idle.mp4";
import TALK_VIDEO from "../assets/assistant-talk.mp4";
const SHOW = 0.64; // how much of the photo's height is visible (top part)

const Clip = ({ src, visible, onFail, restartOnShow = false }) => {
  const ref = useRef(null);

  // Keep it playing while visible, pause when hidden (saves CPU/battery)
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (visible) {
      // Start the talking clip from the beginning each time, so her lips start with the voice
      if (restartOnShow) v.currentTime = 0;
      v.play?.().catch(() => {});
    } else v.pause?.();
  }, [visible]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      autoPlay
      onError={onFail}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

const GirlPortrait = ({ speaking = false, className = "" }) => {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0, W: 0 });
  const [idleOk, setIdleOk] = useState(true);
  const [talkOk, setTalkOk] = useState(true);

  // Show the top part of the photo/video (face down to the chest), anchored to the top
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      if (!W || !H) return;
      const scale = Math.max(Math.min(W / 736, H / (1308 * SHOW)), H / 1308);
      setSize({ w: 736 * scale, h: 1308 * scale, W });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden bg-[#e9ebee] ${className}`}
      role="img"
      aria-label={speaking ? "Assistant is speaking" : "Assistant"}
    >
      {size.w > 0 && (
        <div
          className="absolute top-0"
          style={{
            width: size.w,
            height: size.h,
            left: (size.W - size.w) / 2,
            ...(size.w < size.W - 1 && {
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
              maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            }),
          }}
        >
          {/* Fallback / poster: the still photo */}
          <img
            src={PHOTO}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none"
          />
          {idleOk && <Clip src={IDLE_VIDEO} visible={!speaking || !talkOk} onFail={() => setIdleOk(false)} />}
          {talkOk && <Clip src={TALK_VIDEO} visible={speaking} restartOnShow onFail={() => setTalkOk(false)} />}
        </div>
      )}
    </div>
  );
};

export default GirlPortrait;
