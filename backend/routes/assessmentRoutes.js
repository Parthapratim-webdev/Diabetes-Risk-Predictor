const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/predict", async (req, res) => {

    try {

        const response = await axios.post(
            "http://localhost:5001/predict",
            req.body
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: "Prediction service is unavailable"
        });

    }

});

module.exports = router;