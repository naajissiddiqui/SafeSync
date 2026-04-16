const DEV_MODE = false; // set to false for actual blockchain interaction

import { useState } from "react";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Shield, User, Phone, Globe } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ethers } from "ethers";
import QRCode from "react-qr-code";
import contractABI from "../contracts/UserDetails.json"; // New ABI

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Itinerary {
  id: number;
  description: string;
  arrival: Date;
  departure: Date;
}

interface WelcomeScreenProps {
  onComplete: (data: any) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    touristContact: "",
    aadhaar: "",
    passport: "",
    nationality: "",
    emergencyContact: "",
  });

  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: Date.now(),
      description: "",
      arrival: new Date(),
      departure: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const maskID = (id: string) =>
    id.length > 6 ? "*".repeat(id.length - 6) + id.slice(-6) : id;

  // ---- Itinerary handlers ----
  const addItinerary = () =>
    setItineraries((prev) => [
      ...prev,
      {
        id: Date.now(),
        description: "",
        arrival: new Date(),
        departure: new Date(),
      },
    ]);

  const removeItinerary = (id: number) => {
    if (itineraries.length > 1)
      setItineraries((prev) => prev.filter((it) => it.id !== id));
  };

  const updateItinerary = (id: number, key: keyof Itinerary, value: any) => {
    setItineraries((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [key]: value } : it))
    );
  };

  // ---- Submit to blockchain ----

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.touristContact)
      return alert("Fill required fields");

    setIsLoading(true);

    try {
      if (DEV_MODE) {
        // Simulate blockchain transaction for development
        const fakeTxHash = "0xFAKEDEVTXHASH1234567890";
        setTxHash(fakeTxHash);
        onComplete({ ...formData, itineraries, txHash: fakeTxHash });
        return; // Skip actual MetaMask interaction
      }

      if (!window.ethereum) throw new Error("MetaMask not detected!");

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Use your actual deployed contract address here
      const contractAddress = "0xbB8AdF8832570B97A23eb5Eb0F1391f113412541";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );

      // Call registerTourist
      const tx = await contract.registerTourist(
        formData.name,
        formData.touristContact,
        formData.aadhaar,
        formData.passport,
        formData.nationality,
        formData.emergencyContact
      );

      const receipt = await tx.wait(); // Wait for blockchain confirmation
      setTxHash(receipt.transactionHash);

      onComplete({ ...formData, itineraries, txHash: receipt.transactionHash });
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCopy = async () => {
    if (!txHash) return;
    await navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ---- After successful transaction: QR screen ----
  if (txHash) {
    const qrData = { ...formData, txHash };
    return (
      <div
        className="min-h-screen p-4 flex items-center justify-center"
        style={{ backgroundColor: "#FCEDE8" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-lg p-6">
            <Button onClick={() => setTxHash(null)} className="mb-4">
              ⬅ Back
            </Button>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#310055" }}>
              Digital Tourist ID
            </h2>
            <p className="opacity-70 mb-4" style={{ color: "#310055" }}>
              Generated for {formData.name}
            </p>
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl mb-4">
              <QRCode value={JSON.stringify(qrData)} size={220} />
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm text-blue-600 underline"
              >
                View on Etherscan
              </a>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleCopy} className="flex-1">
                {copied ? "✔ Copied!" : "Copy Tx"}
              </Button>
              <Button
                onClick={() => onComplete({ formData, itineraries, txHash })}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
            <p
              className="text-sm mt-2 opacity-70 text-center"
              style={{ color: "#310055" }}
            >
              🔒 Your data is recorded on Sepolia blockchain
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ---- Registration Form ----
  return (
    <div
      className="min-h-screen p-4 flex items-center justify-center"
      style={{ backgroundColor: "#FCEDE8" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg p-6">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Shield
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: "#310055" }}
              />
            </motion.div>
            <CardTitle
              className="text-2xl font-bold"
              style={{ color: "#310055" }}
            >
              SafeSync
            </CardTitle>
            <p className="text-sm opacity-70" style={{ color: "#310055" }}>
              Your digital safety companion
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  label: "Full Name",
                  key: "name",
                  icon: <User className="w-4 h-4 inline mr-2" />,
                },
                {
                  label: "Tourist Contact",
                  key: "touristContact",
                  icon: <Phone className="w-4 h-4 inline mr-2" />,
                },
                {
                  label: "Aadhaar Number",
                  key: "aadhaar",
                  icon: <Globe className="w-4 h-4 inline mr-2" />,
                },
                {
                  label: "Passport Number",
                  key: "passport",
                  icon: <Globe className="w-4 h-4 inline mr-2" />,
                },
                {
                  label: "Nationality",
                  key: "nationality",
                  icon: <Globe className="w-4 h-4 inline mr-2" />,
                },
                {
                  label: "Emergency Contact",
                  key: "emergencyContact",
                  icon: <Phone className="w-4 h-4 inline mr-2" />,
                },
              ].map((field) => (
                <div className="space-y-2" key={field.key}>
                  <Label htmlFor={field.key} style={{ color: "#310055" }}>
                    {field.icon} {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    placeholder={`Enter ${field.label}`}
                    required
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label style={{ color: "#310055" }}>Trip Itineraries</Label>
                {itineraries.map((it) => (
                  <div
                    key={it.id}
                    className="space-y-2 p-2 bg-gray-100 rounded-md"
                  >
                    <Input
                      value={it.description}
                      onChange={(e) =>
                        updateItinerary(it.id, "description", e.target.value)
                      }
                      placeholder="Description"
                    />
                    <div className="flex gap-2">
                      <DatePicker
                        selected={it.arrival}
                        onChange={(d) => updateItinerary(it.id, "arrival", d)}
                        placeholderText="Arrival"
                        className="flex-1"
                      />
                      <DatePicker
                        selected={it.departure}
                        onChange={(d) => updateItinerary(it.id, "departure", d)}
                        placeholderText="Departure"
                        className="flex-1"
                      />
                    </div>
                    {itineraries.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeItinerary(it.id)}
                        variant="outline"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addItinerary} variant="link">
                  + Add Itinerary
                </Button>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full mt-4 h-12 text-base font-semibold"
                  disabled={isLoading}
                  style={{ backgroundColor: "#310055", color: "#FCEDE8" }}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block mr-2"
                    >
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                  ) : null}
                  {isLoading
                    ? "Registering on Blockchain..."
                    : "Generate Digital ID"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
