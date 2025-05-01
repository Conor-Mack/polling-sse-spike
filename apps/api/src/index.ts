import express from "express";
import cors from "cors";

const app = express();
const PORT = 5174;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/time", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(currentTime);
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
