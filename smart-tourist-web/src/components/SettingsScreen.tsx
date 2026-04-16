import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Bell,
  MapPin,
  Globe,
  Shield,
  User,
  Phone,
  Mail,
} from "lucide-react";

interface SettingsScreenProps {
  userData: any;
  onBack: () => void;
}

export function SettingsScreen({ userData, onBack }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [language, setLanguage] = useState("english");

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिन्दी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "malayalam", label: "മലയാളം (Malayalam)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
  ];

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#FCEDE8" }}>
      <div className="max-w-md mx-auto space-y-6">
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
              Settings
            </h1>
            <p className="text-sm opacity-70" style={{ color: "#310055" }}>
              Manage your safety preferences
            </p>
          </div>
        </motion.div>

        {/* Profile Card */}
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
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#310055" }}>
                  Name
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#310055" }}
                >
                  {userData.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#310055" }}>
                  ID Number
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#310055" }}
                >
                  {userData.idNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#310055" }}>
                  Emergency Contact
                </span>
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" style={{ color: "#310055" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#310055" }}
                  >
                    {userData.emergencyContact}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle
                className="flex items-center"
                style={{ color: "#310055" }}
              >
                <Globe className="w-5 h-5 mr-2" />
                Language Preference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle
                className="flex items-center"
                style={{ color: "#310055" }}
              >
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: "#310055" }}>
                    Push Notifications
                  </p>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Receive safety alerts and updates
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: "#310055" }}>
                    Location Tracking
                  </p>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: "#310055" }}
                  >
                    Allow real-time location monitoring
                  </p>
                </div>
                <Switch
                  checked={locationTracking}
                  onCheckedChange={setLocationTracking}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle
                className="flex items-center"
                style={{ color: "#310055" }}
              >
                <Shield className="w-5 h-5 mr-2" />
                Data Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#310055" }}>
                  Data Encryption
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  End-to-End Encrypted
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#310055" }}>
                  Data Storage
                </span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Secure Cloud
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#310055" }}>
                  Third-party Sharing
                </span>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Disabled
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            variant="outline"
            className="w-full h-12 justify-start"
            style={{ borderColor: "#310055", color: "#310055" }}
          >
            <Mail className="w-4 h-4 mr-3" />
            Export Safety Report
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-start"
            style={{ borderColor: "#310055", color: "#310055" }}
          >
            <Shield className="w-4 h-4 mr-3" />
            Privacy Policy
          </Button>

          <Button variant="destructive" className="w-full h-12 justify-start">
            <User className="w-4 h-4 mr-3" />
            Delete Account
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs opacity-60 pt-4"
          style={{ color: "#310055" }}
        >
          Smart Tourist Safety v1.0.0
          <br />© 2024 - Your data is protected
        </motion.div>
      </div>
    </div>
  );
}
