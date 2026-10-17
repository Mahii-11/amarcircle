import { motion } from "framer-motion";

export default function SpeedMeter({
  speed,
  maxSpeed = 100,
  isActive = false,
}) {
  const clampedSpeed = Math.min(speed, maxSpeed);
  const rotation = (clampedSpeed / maxSpeed) * 180 - 90;

  const getSpeedColor = () => {
    if (clampedSpeed < 10) return "from-red-400 to-red-500";
    if (clampedSpeed < 30) return "from-amber-400 to-orange-500";
    if (clampedSpeed < 60) return "from-yellow-400 to-amber-500";
    return "from-green-400 to-emerald-500";
  };

  const gaugeSegments = [
    { color: "from-red-400 to-red-500", startAngle: -90, endAngle: -54 },
    { color: "from-amber-400 to-orange-500", startAngle: -54, endAngle: -18 },
    { color: "from-yellow-400 to-amber-500", startAngle: -18, endAngle: 18 },
    { color: "from-green-400 to-emerald-500", startAngle: 18, endAngle: 54 },
    { color: "from-green-500 to-green-600", startAngle: 54, endAngle: 90 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
          <linearGradient
            id="pinkBlueGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(350, 100%, 87%)" />
            <stop offset="100%" stopColor="hsl(217, 91%, 60%)" />
          </linearGradient>
          {gaugeSegments.map((segment, index) => (
            <linearGradient
              key={index}
              id={`segment-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor={segment.color.split(" ")[0].replace("from-", "")}
              />
              <stop offset="100%" stopColor={segment.color.split(" ")[2]} />
            </linearGradient>
          ))}
        </defs>

        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="12"
          opacity="0.2"
        />

        {gaugeSegments.map((segment, index) => {
          const startAngle = (segment.startAngle * Math.PI) / 180;
          const endAngle = (segment.endAngle * Math.PI) / 180;
          const radius = 85;
          const x1 = 100 + radius * Math.cos(startAngle);
          const y1 = 100 + radius * Math.sin(startAngle);
          const x2 = 100 + radius * Math.cos(endAngle);
          const y2 = 100 + radius * Math.sin(endAngle);

          const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

          return (
            <motion.path
              key={index}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
              fill="none"
              stroke="url(#pinkBlueGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity={0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          );
        })}

        {isActive && (
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#pinkBlueGradient)"
            strokeWidth="12"
            opacity="0.6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1.05 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        )}

        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="url(#pinkBlueGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
          }}
          style={{ transformOrigin: "100px 100px" }}
        />

        <circle
          cx="100"
          cy="100"
          r="8"
          fill="url(#pinkBlueGradient)"
          stroke="hsl(var(--background))"
          strokeWidth="2"
        />

        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => {
          const angle = ((tick / maxSpeed) * 180 - 90) * (Math.PI / 180);
          const innerRadius = 70;
          const outerRadius = tick % 20 === 0 ? 78 : 75;
          const x1 = 100 + innerRadius * Math.cos(angle);
          const y1 = 100 + innerRadius * Math.sin(angle);
          const x2 = 100 + outerRadius * Math.cos(angle);
          const y2 = 100 + outerRadius * Math.sin(angle);

          return (
            <g key={tick}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={tick % 20 === 0 ? "2" : "1"}
                opacity="0.5"
              />
              {tick % 20 === 0 && (
                <text
                  x={100 + 60 * Math.cos(angle)}
                  y={100 + 60 * Math.sin(angle)}
                  fill="hsl(var(--muted-foreground))"
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-semibold"
                >
                  {tick}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-6xl md:text-7xl font-black bg-linear-to-r from-[hsl(350,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent"
            key={speed}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {clampedSpeed.toFixed(1)}
          </motion.div>
          <div className="text-xl md:text-2xl font-medium text-muted-foreground mt-2">
            Mbps
          </div>
          <div className="text-sm md:text-base text-muted-foreground/60 mt-1">
            Download Speed
          </div>
        </motion.div>
      </div>
    </div>
  );
}
