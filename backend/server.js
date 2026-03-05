const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://taskapp.local",
      "http://taskapp.local:31349"
    ],
    credentials: true
  })
);


// app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/api/test", (req, res) => {
  res.json({ message: "Server working" });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
