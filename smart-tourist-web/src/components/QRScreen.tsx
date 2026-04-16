import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Share, Copy, Check, ArrowLeft, Download } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

interface QRScreenProps {
  userData: any; // The object from WelcomeScreen including txHash
  onBack: () => void;
  onNext: () => void;
}

export function QRScreen({ userData, onBack, onNext }: QRScreenProps) {
  const [copied, setCopied] = useState(false);

  const safeName = userData?.name || "Guest";

  // helper to mask details except last 4 digits
  const mask = (str: string) => {
    if (!str) return "N/A";
    return str.slice(0, -4).replace(/./g, "*") + str.slice(-4);
  };

  const qrPayload = {
    name: safeName,
    aadhar: mask(userData?.aadhaar),
    passport: mask(userData?.passport),
    contact: mask(userData?.touristContact),
    emergencyContact: mask(userData?.emergencyContact),
    txHash: userData?.txHash,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(qrPayload));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Tourist Digital ID",
        text: "Here is my blockchain-backed tourist ID.",
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#FCEDE8" }}>
      <div className="max-w-md mx-auto">
        <motion.button
          onClick={onBack}
          className="mb-4 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-6 h-6" style={{ color: "#310055" }} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle style={{ color: "#310055" }}>
                Digital Tourist ID
              </CardTitle>
              <p className="text-sm opacity-70" style={{ color: "#310055" }}>
                Generated for {safeName}
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-6">
              {/* QR Code */}
              <QRCode
                value={JSON.stringify(qrPayload)}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
              />

              {/* Tx Hash below QR */}
              {userData?.txHash && (
                <p className="text-sm mt-2">
                  <strong>Blockchain Tx:</strong>{" "}
                  <a
                    href={`https://sepolia.etherscan.io/tx/${userData.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#310055", textDecoration: "underline" }}
                  >
                    {userData.txHash}
                  </a>
                </p>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="w-full h-12 flex items-center justify-center"
                    style={{ borderColor: "#310055", color: "#310055" }}
                  >
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <Check className="w-4 h-4 mr-2" /> Copied!
                      </motion.div>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" /> Copy ID
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full h-12 flex items-center justify-center"
                    style={{ borderColor: "#310055", color: "#310055" }}
                  >
                    <Share className="w-4 h-4 mr-2" /> Share
                  </Button>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4"
              >
                <Button
                  onClick={onNext}
                  className="w-full h-12 flex items-center justify-center"
                  style={{ backgroundColor: "#310055", color: "#FCEDE8" }}
                >
                  <Download className="w-4 h-4 mr-2" /> Save & Continue
                </Button>
              </motion.div>

              <p
                className="text-xs opacity-60 mt-2"
                style={{ color: "#310055" }}
              >
                🔒 Your data is masked & securely recorded on Sepolia
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
