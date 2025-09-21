import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const field = {
  label: "Sales region",
  type: "multi-select",
  required: true,
  choices: [
    "Asia",
    "Australia",
    "Western Europe",
    "North America",
    "Eastern Europe",
    "Latin America",
    "Middle East and Africa",
  ],
  displayAlpha: true,
  default: "North America",
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get("/api/field", (req, res) => {
  res.json(field);
});

app.post("/api/field", async (req, res) => {
  console.log("Received field data:", req.body);

  //   await sleep(1000);

  res.json({ status: "success", data: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
