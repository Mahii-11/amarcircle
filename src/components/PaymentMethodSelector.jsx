import { useState } from "react";
import { FiCheck, FiCopy, FiLock, FiSmartphone } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { GATEWAY, MANUAL_METHODS, PAY_NUMBER } from "../data/paymentMethods";

function RadioDot({ active }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
        active ? "border-[#3200b3]" : "border-gray-300"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full bg-[#3200b3] transition ${
          active ? "scale-100" : "scale-0"
        }`}
      />
    </span>
  );
}

function ChannelBadge({ channel }) {
  return (
    <span className="flex h-7 items-center rounded-md border border-gray-200 bg-white px-2">
      {channel.logo ? (
        <img
          src={channel.logo}
          alt={channel.name}
          className="max-h-4 w-auto object-contain"
        />
      ) : (
        <span className="text-[10px] font-semibold text-[#3200b3]">
          {channel.name}
        </span>
      )}
    </span>
  );
}

export default function PaymentMethodSelector({ method, onChange, disabled }) {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAY_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const gatewayActive = method === GATEWAY.id;
  const manualActive = MANUAL_METHODS.some((m) => m.id === method);
  const selectedManual = MANUAL_METHODS.find((m) => m.id === method);

  return (
    <div role="radiogroup" aria-label="Payment method" className="mt-3 space-y-5">
      {/* Group 1: all-in-one gateway */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Pay online instantly
          </h3>
          <span className="rounded-full bg-[#3200b3]/10 px-2 py-0.5 text-[10px] font-semibold text-[#3200b3]">
            Recommended
          </span>
        </div>

        <label
          className={`block cursor-pointer rounded-xl border bg-white p-4 transition ${
            gatewayActive
              ? "border-[#3200b3] shadow-md shadow-[#3200b3]/20 ring-2 ring-[#3200b3]/20"
              : "border-gray-200 hover:border-[#3200b3]/40 hover:shadow-sm"
          } ${disabled ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            type="radio"
            name="payment-method"
            value={GATEWAY.id}
            checked={gatewayActive}
            disabled={disabled}
            onChange={() => onChange(GATEWAY.id)}
            className="sr-only"
          />
          <div className="flex items-center gap-3">
            <RadioDot active={gatewayActive} />
            <img
              src={GATEWAY.logo}
              alt={GATEWAY.name}
              className="h-9 w-24 object-contain"
            />
            <p className="ml-auto hidden items-center gap-1 text-[11px] text-gray-500 sm:flex">
              <FiLock className="h-3 w-3" /> Secure checkout
            </p>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Choose your bank, card or wallet on the next screen. Supports:
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {GATEWAY.channels.map((c) => (
              <ChannelBadge key={c.name} channel={c} />
            ))}
          </div>
        </label>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wide text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        or
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Group 2: manual send money */}
      <section>
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <FiSmartphone className="h-3.5 w-3.5" />
          Send money manually
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {MANUAL_METHODS.map((m) => {
            const active = m.id === method;
            return (
              <label
                key={m.id}
                className={`relative flex cursor-pointer flex-col items-center rounded-xl border bg-white p-3 transition ${
                  active
                    ? "border-[#3200b3] shadow-md shadow-[#3200b3]/20 ring-2 ring-[#3200b3]/20"
                    : "border-gray-200 hover:border-[#3200b3]/40 hover:shadow-sm"
                } ${disabled ? "pointer-events-none opacity-60" : ""}`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={m.id}
                  checked={active}
                  disabled={disabled}
                  onChange={() => onChange(m.id)}
                  className="sr-only"
                />
                <span className="absolute right-2 top-2">
                  <RadioDot active={active} />
                </span>
                <img
                  src={m.logo}
                  alt={m.name}
                  className="mt-3 h-10 w-full object-contain"
                />
                <span
                  className={`mt-1.5 text-[11px] ${
                    active ? "font-semibold text-[#3200b3]" : "text-gray-500"
                  }`}
                >
                  {m.name}
                </span>
              </label>
            );
          })}
        </div>

        {/* Manual transfer details */}
        {manualActive && (
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#3200b3] p-3 text-white shadow-lg shadow-[#3200b3]/20">
            <BsQrCode className="h-9 w-9 shrink-0" />
            <div className="min-w-0 flex-1 text-left">
              <p className="text-[11px] leading-tight text-white/80">
                Send money via {selectedManual?.name} to:
              </p>
              <p className="truncate text-sm font-semibold">{PAY_NUMBER}</p>
            </div>
            <button
              type="button"
              onClick={copyNumber}
              className="flex shrink-0 items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#3200b3] transition active:scale-95"
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
