import { MdPayments } from "react-icons/md";
("react");

export default function PayBill() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
          <MdPayments className="text-blue-600 text-4xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Pay Bill</h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          To pay an internet bill, you typically need the account number and
          billing info associated with your internet service account. You can
          pay online by visiting the website of your internet service provider
          (ISP).
        </p>
      </div>

      {/* Payment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* bKash */}
        <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition-all duration-300">
          <img
            src="/payments/bkashr.png"
            alt="bKash"
            className="w-40 mx-auto mb-4"
          />
          <h2 className="text-center text-lg font-semibold text-gray-800">
            Paybill with Bkash
          </h2>
        </div>

        {/* Rocket */}
        <div className="bg-purple-50 p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition-all duration-300">
          <img
            src="/payments/rocketr.png"
            alt="Rocket"
            className="w-40 mx-auto mb-4"
          />
          <h2 className="text-center text-lg font-semibold text-gray-800">
            Paybill with Rocket
          </h2>
        </div>

        {/* Nagad */}
        <div className="bg-orange-50 p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition-all duration-300">
          <img
            src="/payments/nagadr.png"
            alt="Nagad"
            className="w-40 mx-auto mb-4"
          />
          <h2 className="text-center text-lg font-semibold text-gray-800">
            Paybill with Nagad
          </h2>
        </div>
      </div>
    </div>
  );
}
