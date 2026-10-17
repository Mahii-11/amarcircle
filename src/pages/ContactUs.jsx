import { FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { storeContact } from "../services/api";
import { useState } from "react";

export default function ContactUs() {
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

  return (
    <section id="contact">
      <div className="bg-gray-50 flex flex-col items-center justify-center px-4 py-12 md:py-20">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-pink-100 rounded-full mb-4">
            <FaPhoneAlt className="text-blue-500 text-2xl" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h1>

          <p className="text-gray-500 mt-1">Contact With Us</p>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-2"></div>
        </div>

        {/* FORM */}
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone number"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Message"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-blue-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Sending..." : "Submit"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}