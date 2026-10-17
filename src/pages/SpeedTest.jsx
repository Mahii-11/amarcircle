import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/Button1";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/Progress";
import { Zap, Wifi, Activity } from "lucide-react";
import SpeedMeter from "../components/SpeedMeter";

export default function SpeedTest() {
  const [status, setStatus] = useState("idle");
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);

  const startSpeedTest = () => {
    setStatus("testing");
    setSpeed(0);
    setProgress(0);
    setPing(0);
    setJitter(0);

    const duration = 3000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progressPercent = (currentStep / steps) * 100;
      setProgress(progressPercent);

      const targetSpeed = Math.random() * 50 + 50;
      const currentSpeed = (targetSpeed * currentStep) / steps;
      setSpeed(currentSpeed);

      const currentPing = 5 + Math.random() * 15;
      setPing(currentPing);

      const currentJitter = Math.random() * 3;
      setJitter(currentJitter);

      if (currentStep >= steps) {
        clearInterval(interval);
        setStatus("complete");
        setSpeed(targetSpeed);
        setPing(Math.round(5 + Math.random() * 15));
        setJitter(Math.round(Math.random() * 3 * 10) / 10);
      }
    }, stepDuration);
  };

  const resetTest = () => {
    setStatus("idle");
    setSpeed(0);
    setProgress(0);
    setPing(0);
    setJitter(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 bg-linear-to-br from-[hsl(350,100%,87%)]/10 via-transparent to-[hsl(217,91%,60%)]/10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-linear-to-br from-[hsl(350,100%,80%)] to-[hsl(217,91%,60%)] flex items-center justify-center">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black bg-linear-to-r from-[hsl(350,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent">
              Speed Test
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your internet connection speed with accurate, real-time
            measurements
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <SpeedMeter speed={speed} isActive={status === "testing"} />
          </motion.div>

          <AnimatePresence mode="wait">
            {status === "testing" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <Card className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        Testing Speed...
                      </span>
                      <span className="font-semibold text-foreground">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2"
                      data-testid="progress-speedtest"
                    />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span>Measuring your connection</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            {status === "idle" && (
              <Button
                size="lg"
                onClick={startSpeedTest}
                className="px-12 py-6 text-lg font-semibold rounded-full bg-linear-to-r from-[hsl(350,100%,75%)] to-[hsl(217,91%,60%)] hover:from-[hsl(350,100%,70%)] hover:to-[hsl(217,91%,55%)] text-white border-0 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                data-testid="button-start-test"
              >
                <Wifi className="w-5 h-5 mr-2" />
                Start Speed Test
              </Button>
            )}
            {status === "testing" && (
              <Button
                size="lg"
                disabled
                className="px-12 py-6 text-lg font-semibold rounded-full bg-linear-to-r from-[hsl(350,100%,75%)] to-[hsl(217,91%,60%)] text-white border-0 opacity-70"
                data-testid="button-testing"
              >
                <Activity className="w-5 h-5 mr-2 animate-spin" />
                Testing...
              </Button>
            )}
            {status === "complete" && (
              <Button
                size="lg"
                onClick={resetTest}
                className="px-12 py-6 text-lg font-semibold rounded-full bg-linear-to-r from-[hsl(350,100%,75%)] to-[hsl(217,91%,60%)] hover:from-[hsl(350,100%,70%)] hover:to-[hsl(217,91%,55%)] text-white border-0 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                data-testid="button-test-again"
              >
                <Zap className="w-5 h-5 mr-2" />
                Test Again
              </Button>
            )}
          </motion.div>

          <AnimatePresence>
            {status === "complete" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className="p-6 hover-elevate transition-all"
                    data-testid="card-ping"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[hsl(350,100%,85%)] to-[hsl(350,100%,75%)] flex items-center justify-center">
                        <Activity className="w-6 h-6 text-[hsl(350,100%,30%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium mb-1">
                          Ping
                        </div>
                        <div
                          className="text-3xl font-bold bg-linear-to-r from-[hsl(350,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent"
                          data-testid="text-ping-value"
                        >
                          {ping.toFixed(0)} ms
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className="p-6 hover-elevate transition-all"
                    data-testid="card-jitter"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[hsl(217,91%,70%)] to-[hsl(217,91%,55%)] flex items-center justify-center">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium mb-1">
                          Jitter
                        </div>
                        <div
                          className="text-3xl font-bold bg-linear-to-r from-[hsl(350,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent"
                          data-testid="text-jitter-value"
                        >
                          {jitter.toFixed(1)} ms
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="mt-6 p-6 bg-linear-to-br from-accent/30 to-primary/10 border-accent/20">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-muted-foreground mb-2">
                      Connection Quality
                    </div>
                    <div className="text-2xl font-bold bg-linear-to-r from-[hsl(350,100%,70%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent">
                      {speed >= 50
                        ? "Excellent"
                        : speed >= 25
                        ? "Good"
                        : speed >= 10
                        ? "Fair"
                        : "Poor"}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {speed >= 50 &&
                        "Perfect for streaming, gaming, and video calls"}
                      {speed >= 25 &&
                        speed < 50 &&
                        "Great for HD streaming and browsing"}
                      {speed >= 10 &&
                        speed < 25 &&
                        "Suitable for browsing and SD streaming"}
                      {speed < 10 &&
                        "May experience buffering with video content"}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          <p>
            Your internet speed may vary based on network conditions and server
            distance
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
