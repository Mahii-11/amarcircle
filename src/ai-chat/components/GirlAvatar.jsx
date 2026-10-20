import PHOTO from "../assets/assistant.jpg";
/*
  Small round avatar of the assistant (header, chat bubbles, typing indicator):
  a close crop of her photo. While `speaking` is true a soft ring pulses around it.
*/
const STYLES = `
@keyframes ga-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.35); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ga-ring { animation: none !important; }
}
`;

const GirlAvatar = ({ speaking = false, size = 40, className = "" }) => (
  <span
    className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
    style={{ width: size, height: size }}
    role="img"
    aria-label={speaking ? "Assistant is speaking" : "Assistant"}
  >
    <style>{STYLES}</style>
    {speaking && (
      <span
        className="ga-ring absolute inset-0 rounded-full bg-[#c4b5fd]"
        style={{ animation: "ga-ring 1.2s infinite ease-out" }}
      />
    )}
    <span
      className="relative h-full w-full rounded-full bg-[#e6dcff] bg-no-repeat"
      style={{
        backgroundImage: `url(${PHOTO})`,
        backgroundSize: "118% auto",
        backgroundPosition: "50% 13%",
      }}
    />
  </span>
);

export default GirlAvatar;
