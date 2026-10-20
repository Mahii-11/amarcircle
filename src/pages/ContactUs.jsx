import { FiGlobe, FiMail, FiMapPin, FiPhone, FiSend, FiUser, FiEdit3, FiMessageSquare } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { storeContact } from "../services/api";
import { useState } from "react";
import useContactInfo from "../lib/useContactInfo";
import usePullUnderHeader from "../lib/usePullUnderHeader";

const inputClass =
  "w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#5b3df0] focus:ring-4 focus:ring-purple-100";

function Field({ icon: Icon, children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Icon className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" size={18} />
      {children}
    </div>
  );
}

export default function ContactUs() {
  const contactInfo = useContactInfo();
  const pullUp = usePullUnderHeader();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Simple Validation
    if (!form.name || !form.email || !form.message) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill all required fields!",
      });
      return;
    }

    try {
      setLoading(true);

      await storeContact(form);

      // ✅ Success Popup
      Swal.fire({
        icon: "success",
        title: "Message Sent 🎉",
        text: "We will contact you soon!",
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Reset Form
      setForm({
        name: "",
        phone: "",
        subject: "",
        email: "",
        message: "",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  // contact details come from the API; rows without a value are skipped
  const infoRows = [
    { Icon: FiMapPin, label: "Address", value: contactInfo?.address },
    { Icon: FiPhone, label: "Phone", value: contactInfo?.phone, href: contactInfo?.phone && `tel:${contactInfo.phone}` },
    { Icon: FiMail, label: "Email", value: contactInfo?.email, href: contactInfo?.email && `mailto:${contactInfo.email}` },
    {
      Icon: FiGlobe,
      label: "Website",
      value: contactInfo?.website,
      href: contactInfo?.website && (/^https?:\/\//.test(contactInfo.website) ? contactInfo.website : `https://${contactInfo.website}`),
    },
  ].filter((row) => row.value);

  return (
    <section id="contact" ref={pullUp.ref} style={pullUp.style} className="bg-slate-50">
      {/* HERO BAND */}
      <div
        className="relative overflow-hidden bg-[#020b2a] bg-cover bg-center bg-no-repeat pt-32 pb-36 md:pt-36 md:pb-40 px-4"
        style={{ backgroundImage: 'url("/images/contact%20hero.jpg")' }}
      >
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-md shadow-[0_0_24px_rgba(255,255,255,0.25)] mb-5">
            <FaPhoneAlt className="text-white text-2xl" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
            Contact Us
          </h1>
          <p className="text-white/90 mt-3 text-base md:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">Contact With Us</p>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-300 mx-auto mt-4"></div>
        </div>
      </div>

      {/* CARDS (overlap the band) */}
      <div className="relative -mt-24 md:-mt-28 px-4 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* INFO */}
          {infoRows.length > 0 && (
            <aside className="lg:col-span-2 rounded-3xl p-7 md:p-9 text-white bg-[linear-gradient(160deg,#2a0f8f_0%,#3510B8_55%,#2563EB_130%)] shadow-xl shadow-indigo-900/20 relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <h2 className="text-xl md:text-2xl font-bold mb-2">Get in touch</h2>
              <div className="w-12 h-1 rounded-full bg-white/60 mb-8" />

              <ul className="space-y-6 relative">
                {infoRows.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-purple-200">{label}</p>
                      {href ? (
                        <a href={href} className="font-medium break-words hover:underline">
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium break-words">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* FORM */}
          <div
            className={`bg-white rounded-3xl shadow-xl shadow-slate-300/40 p-6 md:p-10 ${
              infoRows.length > 0 ? "lg:col-span-3" : "lg:col-span-5 max-w-2xl w-full mx-auto"
            }`}
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Send us a message</h2>
            <p className="text-slate-500 text-sm mb-6">We will get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={FiUser}>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full name"
                    className={inputClass}
                  />
                </Field>

                <Field icon={FiPhone}>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Phone number"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={FiEdit3}>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Subject"
                    className={inputClass}
                  />
                </Field>

                <Field icon={FiMail}>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field icon={FiMessageSquare}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Message"
                  className={`${inputClass} resize-none`}
                ></textarea>
              </Field>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#8b22f0] via-[#5b3df0] to-[#2f7cf6] text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FiSend size={18} />
                )}
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
