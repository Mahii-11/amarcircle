import React from "react";

export default function AboutPage() {
  return (
       <section id="about">
          <div className="w-full bg-white text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-blue-700">About us</h2>
          <p className="text-gray-600 mb-10">
            We started our journey in 14 FEB 2015 in Pallabi Thana. We provide high-speed internet and
            with real IPs that are not shared by another workstation or computer. This makes our internet
            perfect for streaming and entertainment applications, such as streaming Netflix and High
            Definition (HD) content. We value your opinion and this why we want you to give us a call today.
            With an increased number of players in the ISP (Internet Service Provider) market. Choosing
            the right High-Speed ISP in Bangladesh was a mind-boggling task. Various ISP services are
            offered at competitive prices. Whereas AMAR CIRCLE provides secured and reliable high
            speed internet service, anywhere in the PALLABI THANA.
          </p>

          <h3 className="text-3xl font-bold mb-6 text-blue-700">
            Why Choose Amarcircle?
          </h3>

          <ul className="space-y-4">
            <li>
              <span className="font-bold">High-Speed Connectivity:</span>{" "}
              Experience blazing-fast internet speeds for browsing, streaming,
              and gaming.
            </li>
            <li>
              <span className="font-bold">Reliability You Can Trust:</span>{" "}
              Advanced infrastructure ensures stable connection even at peak
              hours.
            </li>
            <li>
              <span className="font-bold">Customized Plans:</span> Flexible
              packages for homes and businesses.
            </li>
            <li>
              <span className="font-bold">24/7 Customer Support:</span> Always
              available to assist you.
            </li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 relative w-full flex justify-center items-center mt-10 lg:mt-0">
          {/* Back Image */}
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Team working"
            className="rounded-xl shadow-lg w-[75%] md:w-[90%] object-cover"
          />

          {/* Front Image */}
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt="Technology"
            className="rounded-xl shadow-xl w-[50%] md:w-[45%] absolute -bottom-10 left-5 md:left-20 border-4 border-white"
          />
        </div>
      </div>
    </div>
       </section>
  );
}
