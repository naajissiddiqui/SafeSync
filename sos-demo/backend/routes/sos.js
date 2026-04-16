const express = require("express");
const router = express.Router();

// In-memory SOS store (resets when server restarts)
let sosList = [];

// POST new SOS
router.post("/", async (req, res) => {
  try {
    const { touristId, latitude, longitude, message } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Coordinates required" });
    }

    const sos = {
      _id: Date.now().toString(),
      touristId: touristId || "Unknown",
      latitude,
      longitude,
      message: message || "SOS Emergency!",
      status: "new",
      timestamp: new Date().toISOString(),
    };

    sosList.push(sos);
    console.log("📩 New SOS received:", sos);

    // (Optional) Trigger Twilio Alert here if needed
    // await sendAlert(sos);

    res.json({ success: true, sos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all SOS for dashboard
router.get("/", async (req, res) => {
  res.json(sosList);
});

// Acknowledge SOS
router.post("/:id/acknowledge", (req, res) => {
  const id = req.params.id;
  const sos = sosList.find((s) => s._id === id);
  if (sos) {
    sos.status = "seen";
    console.log(`👮 SOS ${id} acknowledged`);
    return res.json({ success: true, sos });
  }
  res.status(404).json({ error: "SOS not found" });
});

module.exports = router;
