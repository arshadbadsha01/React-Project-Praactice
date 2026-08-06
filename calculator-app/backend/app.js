const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://react-project-practice-pi.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/history", require("./routes/historyRoutes"));

module.exports = app;
