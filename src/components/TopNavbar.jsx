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
        className={`w-full border-b border-gray-100 bg-linear-to-r from-white via-slate-50 to-white text-slate-700 shadow-sm transition-transform duration-300 ${
          show ? "-translate-y-full" : "translate-y-0"
        } md:translate-y-0 `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-2 sm:gap-3">

            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-white border shadow-sm hover:shadow-md transition">
              <FiPhone className="text-slate-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">
                +8801719119115
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border shadow-sm hover:shadow-md transition">
              <FiMail className="text-slate-600 animate-bounce" />
              <span className="text-sm font-medium">
                info@amarcircle.net
              </span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <span className="cursor-pointer hover:text-black transition">
              📡 BTRC Tariff
            </span>

            <div className="h-5 w-px bg-gray-200"></div>

            <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
              <HiOutlineSupport />
              Support
            </span>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl p-2 rounded-lg bg-white shadow-sm"
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