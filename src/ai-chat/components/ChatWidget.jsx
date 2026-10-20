import { lazy, Suspense, useEffect, useState } from "react";
import { Bot, X } from "lucide-react";
const AIChat = lazy(() => import("./AIChat"));

/*
  Floating chat launcher: a round button (bottom-right) that opens AIChat.
    - desktop / tablet: popup panel above the button
    - phone: full-screen chat (close with the X in the chat header)
  The chat mounts on the first open and then stays mounted, so the conversation
  and scroll position are kept when it is closed and reopened.
*/
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const openChat = () => {
    setHasOpened(true);
    setIsOpen(true);
  };
  const closeChat = () => setIsOpen(false);

  // Esc closes the chat; lock page scroll behind the full-screen chat on phones
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const isPhone = window.matchMedia("(max-width: 639px)").matches;
    const previousOverflow = document.body.style.overflow;
    if (isPhone) document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {hasOpened && (
        <div
          role="dialog"
          aria-label="AI chat"
          aria-hidden={!isOpen}
          className={`fixed inset-0 z-50 origin-bottom-right transition-all duration-200 sm:inset-auto sm:bottom-28 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-13rem)] sm:w-[400px] ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-4 opacity-0"
          }`}
        >
          <Suspense fallback={null}>
            <AIChat
              onClose={closeChat}
              isOpen={isOpen}
              className="h-full sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-2xl"
            />
          </Suspense>
        </div>
      )}

      <button
        type="button"
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? "Close AI assistant" : "Talk to our AI assistant"}
        title="AI Assistant - chat or talk"
        aria-expanded={isOpen}
        className={`fixed bottom-6 right-4 z-50 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#8b22f0] via-[#5b3df0] to-[#2f7cf6] text-white shadow-[0_0_24px_rgba(99,102,241,0.6)] ring-4 ring-white/80 transition hover:scale-105 hover:brightness-110 hover:shadow-[0_0_34px_rgba(99,102,241,0.8)] sm:bottom-8 sm:right-6 ${
          isOpen ? "hidden sm:flex" : "flex"
        }`}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <Bot className="h-8 w-8" />
        )}
      </button>
    </>
  );
}