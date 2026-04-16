import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QRScreen } from "./components/QRScreen";
import { Dashboard } from "./components/Dashboard";
import { HistoryScreen } from "./components/HistoryScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { MapScreen } from "./components/MapScreen";

type Screen = "welcome" | "qr" | "dashboard" | "history" | "settings" | "map";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userData, setUserData] = useState<any>(null);

  // ✅ Called after WelcomeScreen completes MetaMask tx
  const handleWelcomeComplete = (data: any) => {
    setUserData(data); // includes form + txHash
    setCurrentScreen("qr");
  };

  // ✅ Called after QRScreen “Continue”
  const handleQRComplete = () => {
    setCurrentScreen("dashboard");
  };

  // Navigation handler for dashboard buttons
  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  // Back button logic
  const handleBack = () => {
    switch (currentScreen) {
      case "qr":
        setCurrentScreen("welcome");
        break;
      case "dashboard":
        setCurrentScreen("qr");
        break;
      case "history":
      case "settings":
      case "map":
        setCurrentScreen("dashboard");
        break;
      default:
        setCurrentScreen("dashboard");
    }
  };

  return (
    <div
      className="w-full min-h-screen font-['Poppins']"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {currentScreen === "welcome" && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}

      {currentScreen === "qr" && userData && (
        <QRScreen
          userData={userData}
          onBack={handleBack}
          onNext={handleQRComplete}
        />
      )}

      {currentScreen === "dashboard" && userData && (
        <Dashboard userData={userData} onNavigate={handleNavigation} />
      )}

      {currentScreen === "history" && <HistoryScreen onBack={handleBack} />}

      {currentScreen === "settings" && userData && (
        <SettingsScreen userData={userData} onBack={handleBack} />
      )}

      {currentScreen === "map" && <MapScreen onBack={handleBack} />}
    </div>
  );
}
