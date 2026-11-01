const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const assessmentRoutes = require("./routes/assessmentRoutes");


require("dotenv").config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

//connect mongo db
connectDB();

app.use("/api/assessment", assessmentRoutes);

app.get("/", (req, res) => {
    res.send("Diabetes Risk Predictor Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

