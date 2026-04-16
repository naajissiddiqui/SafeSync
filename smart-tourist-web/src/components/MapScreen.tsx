// MapScreen.tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, AlertTriangle, Users, Zap } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

interface MapScreenProps {
  onBack: () => void;
}

export function MapScreen({ onBack }: MapScreenProps) {
  // ---- Example coordinates ----
  const moderateRiskCoords: [number, number][] = [
    [19.076, 72.877],
    [18.52, 73.856],
    [20.296, 85.824],
    [19.2183, 72.9781],
    [19.3315, 74.01],
    [18.94, 72.835],
    [19.124, 73.015],
    [19.003, 73.016],
    [18.751, 73.384],
    [19.23, 73.21],
    // ... add more upto 50 for Maharashtra
  ];

  const highRiskCoords: [number, number][] = [
    [19.101, 72.872],
    [18.523, 73.857],
    [19.22, 73.005],
    [19.3, 72.95],
    [18.96, 72.83],
    [19.13, 73.02],
    [19.01, 73.03],
    [18.76, 73.39],
    [19.24, 73.22],
    [19.33, 73.01],
    // ... add more upto 50 for Maharashtra
  ];

  // ---- Outside Maharashtra (all India/world) ----
  const indiaModerate: [number, number][] = [
    [28.6139, 77.209],
    [12.9716, 77.5946],
    [22.5726, 88.3639],
    [23.2599, 77.4126],
    [26.9124, 75.7873],
    [21.1458, 79.0882],
    // ... add more upto 100
  ];

  const indiaHigh: [number, number][] = [
    [13.0827, 80.2707],
    [17.385, 78.4867],
    [19.9975, 73.7898],
    [15.2993, 74.124],
    [11.0168, 76.9558],
    [25.4358, 81.8463],
    // ... add more upto 100
  ];

  const alerts = [
    { id: 1, type: "Crowd Alert", location: "Mumbai", severity: "medium" },
    { id: 2, type: "Safety Notice", location: "Pune", severity: "low" },
    { id: 3, type: "Police Activity", location: "Delhi", severity: "high" },
  ];

  useEffect(() => {
    const mapContainer = document.getElementById("leaflet-map");
    if (!mapContainer) return;

    const initMap = () => {
      const map = L.map("leaflet-map", {
        center: [19.076, 72.877],
        zoom: 5,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // ---- Moderate risk heat (yellow) ----
      L.heatLayer(
        [...moderateRiskCoords, ...indiaModerate].map((c) => [...c, 0.5]),
        { radius: 25, blur: 15, gradient: { 0.4: "yellow", 1: "yellow" } }
      ).addTo(map);

      // ---- High risk heat (red) ----
      L.heatLayer(
        [...highRiskCoords, ...indiaHigh].map((c) => [...c, 0.8]),
        { radius: 25, blur: 15, gradient: { 0.4: "red", 1: "red" } }
      ).addTo(map);
    };

    // delay to ensure container has height
    setTimeout(initMap, 100);
  }, []);

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#FCEDE8" }}>
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <motion.button
              onClick={onBack}
              className="mr-4 p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6" style={{ color: "#310055" }} />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#310055" }}>
                Safety Heatmap
              </h1>
              <p className="text-sm opacity-70" style={{ color: "#310055" }}>
                Real-time area monitoring
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="border-0 shadow-lg"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <CardContent className="p-0" style={{ height: "500px" }}>
              <div
                id="leaflet-map"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.5rem",
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3" style={{ color: "#310055" }}>
                Risk Levels
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-sm" style={{ color: "#310055" }}>
                    Moderate Risk
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-sm" style={{ color: "#310055" }}>
                    High Risk
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Below Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold" style={{ color: "#310055" }}>
                  Area Statistics
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Live Data
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <Users
                    className="w-6 h-6 mx-auto mb-1"
                    style={{ color: "#310055" }}
                  />
                  <p className="text-lg font-bold" style={{ color: "#310055" }}>
                    802
                  </p>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Active Tourists
                  </p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <Zap
                    className="w-6 h-6 mx-auto mb-1"
                    style={{ color: "#310055" }}
                  />
                  <p className="text-lg font-bold" style={{ color: "#310055" }}>
                    3
                  </p>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Active Alerts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3" style={{ color: "#310055" }}>
                Recent Area Alerts
              </h3>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-white rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertTriangle
                        className="w-4 h-4"
                        style={{
                          color:
                            alert.severity === "high"
                              ? "#ef4444"
                              : alert.severity === "medium"
                              ? "#f59e0b"
                              : "#10b981",
                        }}
                      />
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#310055" }}
                        >
                          {alert.type}
                        </p>
                        <p
                          className="text-xs opacity-70"
                          style={{ color: "#310055" }}
                        >
                          {alert.location}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        alert.severity === "high"
                          ? "bg-red-100 text-red-800"
                          : alert.severity === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
