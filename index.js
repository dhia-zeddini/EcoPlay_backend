import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/authR.js"; // Assuming .mjs extension for ESM
// Assuming .mjs extension for ESM

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9090;

app.use(bodyParser.json());
app.use("/", authRoute);


app.get("/", (req, res) => {
  res.send("hello");
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
