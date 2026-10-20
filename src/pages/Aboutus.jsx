import React, { useEffect, useState } from "react";
import { getAboutUsData, getWhyChooseData } from "../services/api";
import AboutSkeleton from "../loader/AboutSkeleton";

const defaultWhyChoose = [
  {
    id: 1,
    title: "High-Speed Connectivity",
    description:
      "Experience blazing-fast internet speeds for browsing, streaming, and gaming.",
  },
  {
    id: 2,
    title: "Reliability You Can Trust",
    description:
      "Advanced infrastructure ensures stable connection even at peak hours.",
  },
  {
    id: 3,
    title: "Customized Plans",
    description: "Flexible packages for homes and businesses.",
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    description: "Always available to assist you.",
  },
];

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [whyChoose, setWhyChoose] = useState(defaultWhyChoose);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const [aboutRes, whyChooseRes] = await Promise.all([
          getAboutUsData(),
          getWhyChooseData(),
        ]);
        setAbout(aboutRes);
        if (whyChooseRes?.length) setWhyChoose(whyChooseRes);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) return <AboutSkeleton />;

  return (
       <section id="about">
          <div className="w-full bg-white text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-blue-700">
            {about?.title || "About us"}
          </h2>
          <p className="text-gray-600 mb-10">
            {about?.description ||
              "We started our journey in 14 FEB 2015 in Pallabi Thana. We provide high-speed internet and with real IPs that are not shared by another workstation or computer."}
          </p>

          <h3 className="text-3xl font-bold mb-6 text-blue-700">
            Why Choose Amarcircle?
          </h3>

          <ul className="space-y-4">
            {whyChoose.map((item) => (
              <li key={item.id}>
                <span className="font-bold">{item.title}:</span>{" "}
                {item.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 relative w-full flex justify-center items-center mt-10 lg:mt-0">
          {/* Back Image */}
          <img
            src={about?.primary_image || "https://images.unsplash.com/photo-1552664730-d307ca884978"}
            alt="Team working"
            className="rounded-xl shadow-lg w-[75%] md:w-[90%] object-cover"
          />

          {/* Front Image */}
          <img
            src={about?.secondary_image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"}
            alt="Technology"
            className="rounded-xl shadow-xl w-[50%] md:w-[45%] absolute -bottom-10 left-5 md:left-20 border-4 border-white"
          />
        </div>
      </div>
    </div>
       </section>
  );
}
