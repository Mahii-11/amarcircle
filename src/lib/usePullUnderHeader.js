import { useLayoutEffect, useRef, useState } from "react";

// The fixed header sits above a top bar + spacer, which leaves a gap before page content.
// Attach `ref` + `style` to a page's first section to pull it up right under the header.
export default function usePullUnderHeader() {
  const ref = useRef(null);
  const [pull, setPull] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      const header = document.querySelector("header");
      if (!el || !header) return;
      const natural = el.getBoundingClientRect().top + window.scrollY + pull;
      const next = Math.max(0, Math.round(natural - header.offsetHeight));
      if (next !== pull) setPull(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  });

  return { ref, style: { marginTop: -pull } };
}
