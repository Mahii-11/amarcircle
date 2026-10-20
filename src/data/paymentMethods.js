// Payment number shown on manual wallet transfers (replace with the real one)
export const PAY_NUMBER = "017xxxxxxxx";

// All-in-one gateway: the supported channels live inside it
export const GATEWAY = {
  id: "sslcommerz",
  name: "SSLCommerz",
  logo: "/payments/sslcommerz-logo.jpg",
  channels: [
    { name: "Visa", logo: "/payments/visa.png" },
    { name: "Mastercard", logo: "/payments/mastercard.png" },
    { name: "bKash", logo: "/payments/bkash.png" },
    { name: "Nagad", logo: "/payments/nagad.png" },
    { name: "Rocket", logo: "/payments/rocket.png" },
    { name: "NexusPay", logo: null },
    { name: "Net Banking", logo: null },
  ],
};

// Direct send-money to our own merchant number
export const MANUAL_METHODS = [
  { id: "bkash", name: "bKash", logo: "/payments/bkash.png" },
  { id: "nagad", name: "Nagad", logo: "/payments/nagad.png" },
  { id: "rocket", name: "Rocket", logo: "/payments/rocket.png" },
];

export const ALL_METHODS = [GATEWAY, ...MANUAL_METHODS];
