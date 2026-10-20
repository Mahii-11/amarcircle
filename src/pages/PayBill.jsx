import { useState } from "react";
import {
  FiSearch,
  FiArrowRight,
  FiZap,
  FiShield,
  FiHeadphones,
  FiGlobe,
  FiWifi,
  FiCheck,
} from "react-icons/fi";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { ALL_METHODS } from "../data/paymentMethods";

const STEPS = ["Enter ID", "Choose Payment", "Complete"];

const SIDE_POINTS = [
  { icon: FiZap, label: "Fast & Reliable" },
  { icon: FiShield, label: "Secure Payment" },
  { icon: FiHeadphones, label: "24/7 Support" },
];

export default function PayBill() {
  const [customerId, setCustomerId] = useState("");
  const [method, setMethod] = useState("sslcommerz");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const selected = ALL_METHODS.find((m) => m.id === method);

  const handleProceed = () => {
    if (step === 3) {
      setStep(1);
      setCustomerId("");
      return;
    }
    if (step === 1) {
      if (!customerId.trim()) {
        setError("Please enter your Customer ID");
        return;
      }
      setError("");
      setStep(2);
      return;
    }
    setStep(3);
  };

  const buttonLabel =
    step === 1 ? "Verify & Proceed" : step === 2 ? "Confirm Payment" : "Done";

  return (
    <div className="relative -mt-20 min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f3f0ff] via-white to-[#e9e4ff] px-4 pb-10 pt-28 sm:pb-12 sm:pt-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#3200b3]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#3200b3]/10 blur-3xl" />
      <FiWifi className="pointer-events-none absolute right-10 top-1/3 hidden h-40 w-40 text-[#3200b3]/10 lg:block" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-10 lg:justify-between">
        {/* Left tagline */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <h2 className="font-['Playfair_Display'] text-3xl font-semibold leading-tight text-[#3200b3]/70">
            Stay Connected
            <br />
            Stay Ahead
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            High Speed Internet
            <br />
            for a Better Tomorrow
          </p>
          <ul className="mt-8 space-y-4">
            {SIDE_POINTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm text-gray-500"
              >
                <Icon className="h-4 w-4 text-[#3200b3]/60" />
                {label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Card */}
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-[#3200b3]/10 bg-white p-6 shadow-xl shadow-[#3200b3]/10 sm:p-12">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#3200b3]/10">
                <FiGlobe className="h-6 w-6 text-[#3200b3]" />
              </div>
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#1f0a66] sm:text-3xl">
                Pay Your Internet Bill Online
              </h1>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Quick &bull; Secure &bull; Hassle-Free
              </p>
            </div>

            {/* Customer ID */}
            <label
              htmlFor="customer-id"
              className="mt-8 block text-sm font-semibold text-[#1f0a66]"
            >
              Enter Customer ID
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-xl border bg-[#f8f6ff] px-4 py-3 transition focus-within:border-[#3200b3] focus-within:ring-2 focus-within:ring-[#3200b3]/20 ${
                error ? "border-red-400" : "border-[#3200b3]/15"
              }`}
            >
              <FiSearch className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                id="customer-id"
                type="text"
                inputMode="numeric"
                value={customerId}
                disabled={step === 3}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                  setError("");
                  if (step === 2) setStep(1);
                }}
                placeholder="e.g. 1234567890"
                className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

            {/* Payment methods */}
            <p className="mt-8 text-sm font-semibold text-[#1f0a66]">
              Select Payment Method
            </p>
            <PaymentMethodSelector
              method={method}
              onChange={setMethod}
              disabled={step === 3}
            />

            {/* Step message */}
            {step === 2 && (
              <p className="mt-5 rounded-lg bg-[#f3f0ff] px-3 py-2 text-center text-xs text-[#3200b3]">
                Paying ID <b>{customerId}</b> via <b>{selected?.name}</b>. Confirm
                to continue.
              </p>
            )}
            {step === 3 && (
              <p className="mt-5 rounded-lg bg-green-50 px-3 py-2 text-center text-xs text-green-700">
                Thank you! Your payment request for ID <b>{customerId}</b> has
                been received.
              </p>
            )}

            <button
              type="button"
              onClick={handleProceed}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#3200b3] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3200b3]/30 transition hover:bg-[#2a0096] active:scale-[0.99]"
            >
              {buttonLabel}
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Stepper */}
          <ol className="mx-auto mt-8 flex max-w-md items-start justify-between">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const current = step === n;
              return (
                <li
                  key={label}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {i > 0 && (
                    <span
                      className={`absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 ${
                        step >= n ? "bg-[#3200b3]" : "bg-gray-300"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                      done || current
                        ? "border-[#3200b3] bg-[#3200b3] text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {done ? <FiCheck /> : n}
                  </span>
                  <span
                    className={`mt-1.5 text-[11px] ${
                      current ? "font-semibold text-[#3200b3]" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* spacer to keep the card centred on large screens */}
        <div className="hidden w-56 shrink-0 lg:block" />
      </div>
    </div>
  );
}
