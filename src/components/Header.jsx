import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 👉 Menu open thakle header hide/show logic off
      if (open) return;

      if (currentScroll < 50) {
        setShowHeader(true);
      } else if (currentScroll > lastScroll) {
        setShowHeader(false); // scroll down
      } else {
        setShowHeader(true); // scroll up
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // 🔥 Body scroll lock when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const navItems = [
    { to: "/media", label: "media" },
    { to: "/aboutus", label: "About us" },
    { to: "/services", label: "Services" },
    { to: "/our-story", label: "Our Story" },
    { to: "/our-package", label: "Package" },
    { to: "/paybill", label: "Pay bill" },
    { to: "/contactus", label: "Contact us" },
  ];

  return (
    <>
      {/* 🔥 HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-40 bg-[#3200b3] shadow-lg transition-all duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 h-16">
          {/* Logo */}
          <div className="text-white text-2xl font-semibold tracking-wide">
            <NavLink to="/" className="flex items-center gap-2">
              <img src="images/logo-1.png" alt="logo" className="w-auto h-20 sm:h-24" />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-white text-lg font-['Playfair_Display'] tracking-wide">
              {navItems.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-blue-800 px-4 py-2 rounded-md font-semibold shadow"
                        : "hover:text-gray-300 transition"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* 🔥 OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-50"
        ></div>
      )}

      {/* 🔥 SLIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#3200b3] text-white z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 shadow-xl`}
      >
        {/* Top Bar */}
        <div className="p-4 flex justify-between items-center border-b border-white/20">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button className="text-3xl" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-6 p-6 text-lg font-['Playfair_Display']">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block bg-blue-800 px-4 py-2 rounded-md font-semibold shadow"
                    : "block hover:text-gray-300 transition"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔥 CONTENT GAP FIX (important) */}
      <div className="h-[80px]" />
    </>
  );
};

export default Header;