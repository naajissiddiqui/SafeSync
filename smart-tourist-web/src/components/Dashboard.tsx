import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Zap,
  Settings,
  History,
  Map,
  Phone,
} from "lucide-react";

interface DashboardProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ userData, onNavigate }: DashboardProps) {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [safetyScore] = useState(85);
  const [isPanicPressed, setIsPanicPressed] = useState(false);

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "High tourist activity area detected",
      time: "5 mins ago",
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: "info",
      message: "Geo-fence alert: Entering monitored zone",
      time: "12 mins ago",
      icon: MapPin,
    },
    {
      id: 3,
      type: "success",
      message: "Safe zone confirmed - Local police nearby",
      time: "1 hour ago",
      icon: Shield,
    },
  ];

  const handlePanic = () => {
    setIsPanicPressed(true);
    setTimeout(() => setIsPanicPressed(false), 3000);

    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        console.log("📍 Sending SOS with coords:", latitude, longitude);

        const res = await fetch("http://localhost:5000/api/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            touristId: "T123",
            message: "SOS Emergency! Tourist needs help",
            latitude,
            longitude,
            status: "new",
            timestamp: new Date().toISOString(),
          }),
        });

        console.log("➡️ Raw response:", res.status, res.statusText);

        const data = await res.json();
        console.log("✅ SOS response:", data);

        alert("🚨 SOS sent successfully!");
      } catch (err) {
        console.error("❌ Error sending SOS:", err);
      }
    });
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#FCEDE8" }}>
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#310055" }}>
              Welcome back, {userData.name.split(" ")[0]}
            </h1>
            <p className="text-sm opacity-70" style={{ color: "#310055" }}>
              Stay safe on your journey
            </p>
          </div>
          <motion.button
            onClick={() => onNavigate("settings")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white shadow-sm"
          >
            <Settings className="w-5 h-5" style={{ color: "#310055" }} />
          </motion.button>
        </motion.div>

        {/* Safety Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle
                className="flex items-center"
                style={{ color: "#310055" }}
              >
                <Shield className="w-5 h-5 mr-2" />
                Safety Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "#310055" }}>Current Safety Level</span>
                <span className="font-bold" style={{ color: "#310055" }}>
                  {safetyScore}%
                </span>
              </div>
              <Progress value={safetyScore} className="h-3" />
              <p
                className="text-xs mt-2 opacity-70"
                style={{ color: "#310055" }}
              >
                Based on location, time, and local activity
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Panic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={handlePanic}
            className="w-32 h-32 rounded-full bg-red-500 shadow-xl flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              isPanicPressed
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)",
                      "0 0 0 20px rgba(239, 68, 68, 0)",
                      "0 0 0 40px rgba(239, 68, 68, 0)",
                    ],
                  }
                : {}
            }
            transition={{ repeat: isPanicPressed ? Infinity : 0, duration: 1 }}
          >
            <div className="text-center text-white">
              <Phone className="w-8 h-8 mx-auto mb-1" />
              <span className="text-xs font-semibold">PANIC</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Real-time Tracking Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold" style={{ color: "#310055" }}>
                  Real-time Tracking
                </h3>
                <p className="text-sm opacity-70" style={{ color: "#310055" }}>
                  Share location with emergency contacts
                </p>
              </div>
              <Switch
                checked={trackingEnabled}
                onCheckedChange={setTrackingEnabled}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle
                className="flex items-center justify-between"
                style={{ color: "#310055" }}
              >
                <span className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Recent Alerts
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("history")}
                  style={{ color: "#310055" }}
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.slice(0, 2).map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-white rounded-lg"
                >
                  <alert.icon
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#310055" }}
                  />
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: "#310055" }}>
                      {alert.message}
                    </p>
                    <p
                      className="text-xs opacity-60"
                      style={{ color: "#310055" }}
                    >
                      {alert.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => onNavigate("map")}
              className="w-full h-16 flex-col space-y-1"
              variant="outline"
              style={{ borderColor: "#310055", color: "#310055" }}
            >
              <Map className="w-6 h-6" />
              <span className="text-xs">Safety Map</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => onNavigate("history")}
              className="w-full h-16 flex-col space-y-1"
              variant="outline"
              style={{ borderColor: "#310055", color: "#310055" }}
            >
              <History className="w-6 h-6" />
              <span className="text-xs">Alert History</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
