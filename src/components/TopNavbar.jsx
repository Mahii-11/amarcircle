import { useState, useEffect } from "react";
import { FiPhone, FiMail, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineSupport } from "react-icons/hi";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  // 🔥 SCROLL LOGIC (mobile only)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // only mobile screen
      if (window.innerWidth < 768) {
        // small movement ignore (smoothness)
        if (Math.abs(currentScrollY - lastScrollY) < 8) return;

        if (currentScrollY > lastScrollY) {
          // scroll down → hide
          setShow(false);
        } else {
          // scroll up → show
          setShow(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full select-none">

      {/* ================= TOP BAR ================= */}
      <div
        className={`w-full border-b border-white/10 bg-gradient-to-r from-[#1b0a5c] via-[#2a0f8f] to-[#1b0a5c] text-white/90 shadow-md shadow-indigo-950/20 transition-transform duration-300 ${
          show ? "-translate-y-full" : "translate-y-0"
        } md:translate-y-0 `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-2 sm:gap-3">

            <div className="group flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 hover:ring-white/30 transition">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#A21CAF] to-[#2563EB] text-white shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                <FiPhone className="text-xs" />
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-white">
                +8801719119115
              </span>
            </div>

            <div className="group hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 hover:ring-white/30 transition">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#06b6d4] text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                <FiMail className="text-xs" />
              </span>
              <span className="text-sm font-medium tracking-wide text-white">
                info@amarcircle.net
              </span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <span className="cursor-pointer px-3 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition">
              📡 BTRC Tariff
            </span>

            <div className="h-4 w-px bg-white/20"></div>

            <span className="flex items-center gap-1.5 cursor-pointer px-3 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition">
              <HiOutlineSupport />
              Support
            </span>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-xl p-2 rounded-lg bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/20 transition"
          >
            <FiMenu />
          </button>

        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[998] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ================= TOP SLIDE DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 w-full z-[999] bg-white shadow-xl transform transition-transform duration-500 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >

        {/* header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-slate-700">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* content */}
        <div className="p-4 flex flex-col gap-4 text-slate-700 font-medium">

          <div className="flex items-center gap-2">
            <FiPhone />
            +8801719119115
          </div>

          <div className="flex items-center gap-2">
            <FiMail />
            info@amarcircle.net
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineSupport />
            Support
          </div>

        </div>
      </div>

    </div>
  );
}