import { Check, Zap } from "lucide-react";
import { Button } from "../components/ui/Buttons";
import { Badge } from "../components/ui/Badges";

export default function PricingCard({
  label,
  labelColor,
  packageName,
  speed,
  price,
  billingPeriod,
  features,
  ctaText = "Get Started",
  isPopular = false,
}) {
  return (
    <div
      className="relative h-full rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      data-testid={`card-pricing-${packageName
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <div className="absolute top-6 right-6">
        <Badge
          className={`${labelColor} text-white border-0 px-3 py-1 text-xs font-medium uppercase tracking-wide no-default-hover-elevate no-default-active-elevate`}
          data-testid={`badge-label-${label.toLowerCase()}`}
        >
          {label}
        </Badge>
      </div>

      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h3
            className="text-2xl font-semibold text-foreground mb-4"
            data-testid={`text-package-name-${packageName
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {packageName}
          </h3>

          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <span
              className="text-lg font-medium text-muted-foreground"
              data-testid={`text-speed-${speed
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {speed}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span
                className="text-5xl font-bold text-foreground"
                data-testid={`text-price-${price}`}
              >
                {price}
              </span>
              <span className="text-xl text-muted-foreground">
                /{billingPeriod}
              </span>
            </div>
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
              data-testid={`list-item-feature-${index}`}
            >
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-base text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          size="lg"
          data-testid={`button-cta-${packageName
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
