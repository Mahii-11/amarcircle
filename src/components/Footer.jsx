import { motion } from "framer-motion";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function XploreFooter() {
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
              src="/images/logo.png"
              alt="Xplore Net"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-3xl font-bold">Amarcircle</h2>
          </div>

          <p className="text-gray-300 leading-relaxed">
            An ISP (Internet Service Provider) is a company that provides
            internet access to customers. The business model of an ISP typically
            involves offering various internet packages to customers, such as
            broadband.
          </p>
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
