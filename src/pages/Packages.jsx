import PricingSection from "../components/PricingSectionProps";

const pricingPlans = [
  {
    label: "Starter",
    labelColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    packageName: "Basic Plan",
    speed: "15 Mbps",
    price: "৳599",
    billingPeriod: "month",
    features: [
      "15 Mbps download speed",
      "100 GB data per month",
      "Email support",
      "Standard router",
      "Basic installation",
    ],
    ctaText: "Get Started",
    isPopular: false,
  },
  {
    label: "Popular",
    labelColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    packageName: "Standard Plan",
    speed: "25 Mbps",
    price: "৳999",
    billingPeriod: "month",
    features: [
      "25 Mbps download speed",
      "Unlimited data usage",
      "24/7 phone support",
      "Premium router included",
      "Free installation",
      "Priority support",
    ],
    ctaText: "Get Started",
    isPopular: true,
  },
  {
    label: "Professional",
    labelColor: "bg-gradient-to-r from-orange-500 to-red-600",
    packageName: "Business Pro",
    speed: "50 Mbps",
    price: "৳1,999",
    billingPeriod: "month",
    features: [
      "50 Mbps ultra-fast speed",
      "Unlimited data usage",
      "Dedicated account manager",
      "Advanced router + mesh",
      "Free installation & setup",
      "On-site tech support",
      "Static IP address",
    ],
    ctaText: "Get Started",
    isPopular: false,
  },
  {
    label: "Enterprise",
    labelColor: "bg-gradient-to-r from-yellow-500 to-amber-600",
    packageName: "Enterprise Plan",
    speed: "100 Mbps",
    price: "৳3,999",
    billingPeriod: "month",
    features: [
      "100 Mbps blazing speed",
      "Unlimited data usage",
      "Dedicated support team",
      "Enterprise-grade equipment",
      "Free installation & training",
      "24/7 on-site support",
      "Multiple static IPs",
      "Custom SLA agreement",
    ],
    ctaText: "Contact Sales",
    isPopular: false,
  },
];

export default function Packages() {
  return (
    <div className="min-h-screen">
      <PricingSection
        title="Choose Your Perfect Plan"
        subtitle="Flexible pricing options designed to grow with your business"
        pricingPlans={pricingPlans}
      />
    </div>
  );
}
