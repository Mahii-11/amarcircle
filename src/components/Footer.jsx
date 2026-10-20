import { motion } from "framer-motion";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useContactInfo from "../lib/useContactInfo";
import { getPageList } from "../services/api";

export default function XploreFooter() {
  const contactInfo = useContactInfo();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getPageList()
      .then((list) => setPages(Array.isArray(list) ? list : []))
      .catch((error) => console.error("Error fetching page list:", error));
  }, []);

  return (
    <footer className="bg-[#052545] text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <img
              src={contactInfo?.logo || "/images/logo.png"}
              alt="Amarcircle"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-3xl font-bold">Amarcircle</h2>
          </div>

          {contactInfo?.short_description && (
            <p className="text-gray-300 leading-relaxed">
              {contactInfo.short_description}
            </p>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-blue-400 pl-3">
            Quick Links
          </h3>
           <div className="flex flex-col sm:flex-row gap-9">
            <div>
              <ul className="space-y-3 text-gray-300">
                  <li>
              <Link to="/services" className="hover:text-white">
                Our story
              </Link>
            </li>
                <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/package" className="hover:text-white">
                Internet package
              </Link>
            </li>
              </ul>
            </div>


            <div>
                <ul className="space-y-3 text-gray-300">
            <li>
              <Link to="/paybill" className="hover:text-white">
                PayBill
              </Link>
            </li>
              <li>
              <Link to="/paybill" className="hover:text-white">
                Contact us
              </Link>
            </li>
             <li>
              <Link to="/btrc-tariff" className="hover:text-white">
                BTRC Tariff
              </Link>
            </li>
          </ul>
            </div>


           </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold border-l-4 border-blue-400 pl-3">
            Social Media Links
          </h3>
          <p className="text-gray-300">Follow us:</p>
          <div className="flex items-center space-x-5 text-xl">
            <a
              href="#"
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-green-600 hover:bg-green-700 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Dynamic pages (Terms and Conditions, ...) */}
      {pages.length > 0 && (
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-300">
          {pages.map((page) => (
            <Link
              key={page.slug}
              to={`/page/${page.slug}`}
              className="hover:text-white transition"
            >
              {page.title}
            </Link>
          ))}
        </div>
      )}

      {/* Payment Gateway Logos
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 border-t border-gray-700 pt-8"
      >
        <p className="text-gray-300 mb-4 text-center">Pay With</p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "visa.png",
            "mastercard.png",
            "bkash.png",
            "nagad.png",
            "rocket.png",
            "upay.png",
            "fastcash.png",
            "qpay.png",
            "mtb.png",
            "city.png",
            "bankasia.png",
          ].map((img, idx) => (
            <img
              key={idx}
              src={`/payments/${img}`}
              alt="pay-option"
              className="h-10 object-contain"
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-300 mb-2">Verified by</p>
          <img
            src="/payments/sslcommerz.png"
            alt="sslcommerz"
            className="h-10 mx-auto"
          />
        </div>
      </motion.div>
      */}
    </footer>
  );
}
