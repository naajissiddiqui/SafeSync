import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  MapPin,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "High tourist activity area detected",
      time: "5 mins ago",
      icon: AlertTriangle,
      status: "active",
      location: "Times Square, NY",
    },
    {
      id: 2,
      type: "info",
      message: "Geo-fence alert: Entering monitored zone",
      time: "12 mins ago",
      icon: MapPin,
      status: "resolved",
      location: "Central Park Area",
    },
    {
      id: 3,
      type: "success",
      message: "Safe zone confirmed - Local police nearby",
      time: "1 hour ago",
      icon: Shield,
      status: "resolved",
      location: "Broadway District",
    },
    {
      id: 4,
      type: "warning",
      message: "Crowd density alert",
      time: "2 hours ago",
      icon: AlertTriangle,
      status: "resolved",
      location: "Brooklyn Bridge",
    },
    {
      id: 5,
      type: "info",
      message: "Check-in reminder sent to emergency contact",
      time: "4 hours ago",
      icon: CheckCircle,
      status: "resolved",
      location: "Hotel Area",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#ef4444";
      case "resolved":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#FCEDE8" }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center mb-6"
        >
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
              Alert History
            </h1>
            <p className="text-sm opacity-70" style={{ color: "#310055" }}>
              Your safety activity log
            </p>
          </div>
        </motion.div>

        {/* Alert List */}
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <alert.icon
                        className="w-5 h-5"
                        style={{
                          color:
                            alert.type === "warning"
                              ? "#f59e0b"
                              : alert.type === "success"
                              ? "#10b981"
                              : "#310055",
                        }}
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#310055" }}
                        >
                          {alert.message}
                        </p>
                        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: getStatusColor(alert.status),
                            }}
                          />
                          <span
                            className="text-xs capitalize"
                            style={{ color: getStatusColor(alert.status) }}
                          >
                            {alert.status}
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex items-center space-x-2 text-xs opacity-70"
                        style={{ color: "#310055" }}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location}</span>
                      </div>

                      <div
                        className="flex items-center space-x-2 text-xs opacity-60"
                        style={{ color: "#310055" }}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            className="w-full h-12"
            style={{ borderColor: "#310055", color: "#310055" }}
          >
            Load More History
          </Button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3" style={{ color: "#310055" }}>
                Safety Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#310055" }}
                  >
                    24
                  </p>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Total Alerts
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">18</p>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Resolved
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">1</p>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Active
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
