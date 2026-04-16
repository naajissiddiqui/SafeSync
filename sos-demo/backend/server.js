const express = require("express");
const cors = require("cors");
const sosRoutes = require("./routes/sos");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sos", sosRoutes);

app.listen(PORT, () => {
  console.log(`🚨 SOS Server running at http://localhost:${PORT}`);
});
