import { FaGlobe, FaTv, FaServer } from "react-icons/fa";
import { Globe, Smile, Headphones, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCommunityData } from "../services/api";
import CommunitySkeleton from "../loader/CommunitySkeleton";

function Services() {
  return (
    <div>
      <ServicesPage />
      <CommunitySection />
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="w-full bg-white text-gray-800 px-6 md:px-16 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1043/1043791.png"
            alt="service icon"
            className="w-14 h-14"
          />
        </div>

        <h1 className="text-4xl font-bold text-blue-800">SERVICE</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-2 mb-6"></div>

        <p className="text-gray-600 text-lg leading-relaxed">
          An ISP (Internet Service Provider) provides customers with internet
          access by offering various types of service packages, such as
          residential, business, and mobile internet plans. These packages
          typically include.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {/* Cable TV
        <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition duration-300">
          <FaGlobe className="text-blue-700 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Cable TV</h2>
          <p className="text-gray-600 leading-relaxed">
            Cable TV is a type of television service that is delivered to
            customers through a network of cables. It is typically.
          </p>
        </div>  */}

        {/* Broadband Internet */}
        <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition duration-300">
          <FaTv className="text-blue-700 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
            Broadband Internet
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Broadband internet refers to high-speed internet access that is
            always on and faster than traditional dial-up connections.
          </p>
        </div>

        {/* Domain & Hosting */}
        <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition duration-300">
          <FaServer className="text-blue-700 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
            Domain & Hosting
          </h2>
          <p className="text-gray-600 leading-relaxed">
            When a website is hosted, it is assigned a unique IP address, which
            corresponds to the server.
          </p>
        </div>
      </div>
    </div>
  );
}

const iconMap = {
  users: Users,
  globe: Globe,
  smile: Smile,
  support: Headphones,
};

function CommunitySection() {

  const normalizeIcon = (iconName) => {
  if (!iconName) return Users; // default fallback

  const key = iconName.toLowerCase();

  return iconMap[key] || Users; // fallback icon
};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getCommunityData();
          setData(response);
        } catch (error) {
          console.error("Error fetching community data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, [])

  if (loading) return <CommunitySkeleton />





  return (
    <section className="w-full bg-[#f6f7fb] py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d1b39]">
            Join our community
          </h2>

          <p className="text-lg text-gray-700">
            We have considered our business solutions to support you on every
            stage of your growth.
          </p>

          <p className="text-gray-600">
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </motion.div>

        {/* Right — Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card */}
          {data.map((item, index) => {
            const Icon = normalizeIcon(item.icon);
             return (
             <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 + index * 0.1 }}
        className="shadow-lg rounded-2xl p-6 bg-white flex items-center gap-4"
      >
        <Icon className="w-12 h-12 text-blue-600" />

        <div>
          <h3 className="text-3xl font-bold text-[#0d1b39]">
            {item.count}
          </h3>
          <p className="text-gray-600 font-medium">
            {item.title}
          </p>
        </div>
             </motion.div>
             )})}
        </div>
      </div>
    </section>
  );
}

export default Services;
