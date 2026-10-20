import {
  Zap,
  Users,
  BadgeDollarSign,
  Headphones,
  ShieldCheck,
  Wifi,
  Clock,
  Star,
  Globe,
  Signal,
  CircleCheck,
  Target,
  Eye,
  Rocket,
} from "lucide-react";

// The API sends Font Awesome class names (e.g. "fa-solid fa-bolt"); map them to lucide icons.
const ICONS = {
  bolt: Zap,
  users: Users,
  "user-group": Users,
  "dollar-sign": BadgeDollarSign,
  "money-bill": BadgeDollarSign,
  tag: BadgeDollarSign,
  headset: Headphones,
  headphones: Headphones,
  "shield-halved": ShieldCheck,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  wifi: Wifi,
  signal: Signal,
  clock: Clock,
  star: Star,
  globe: Globe,
  check: CircleCheck,
  "circle-check": CircleCheck,
  bullseye: Target,
  "crosshairs": Target,
  eye: Eye,
  rocket: Rocket,
};

const FA_STYLES = ["fa-solid", "fa-regular", "fa-brands"];

export const getFaIcon = (icon = "", fallback = Zap) => {
  const name = icon.split(" ").find((c) => c.startsWith("fa-") && !FA_STYLES.includes(c));
  return ICONS[name?.replace("fa-", "")] || fallback;
};
