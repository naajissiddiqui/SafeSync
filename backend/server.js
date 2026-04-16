import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Load ABI
const abiPath =
  "../blockchain/artifacts/contracts/TouristRegistry.sol/UserDetails.json";
const contractABI = JSON.parse(fs.readFileSync(abiPath)).abi;

// ✅ Load provider & wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  wallet
);

// 🟡 Register tourist
app.post("/register", async (req, res) => {
  try {
    const { contact, aadhar, passport, emergency } = req.body;

    const tx = await contract.registerTourist(
      contact,
      aadhar,
      passport,
      emergency
    );
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🟡 Get tourist (masked details)
app.get("/tourist/:address", async (req, res) => {
  try {
    const userAddress = req.params.address;
    const [contact, aadhar, passport, emergency] = await contract.getTourist(
      userAddress
    );

    // ✅ Mask data → only last 4 digits visible
    const mask = (str) =>
      str.length > 4 ? "*".repeat(str.length - 4) + str.slice(-4) : str;

    res.json({
      contact: mask(contact),
      aadhar: mask(aadhar),
      passport: mask(passport),
      emergency: mask(emergency),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Start server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
