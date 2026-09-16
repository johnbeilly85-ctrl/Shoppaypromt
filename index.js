const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

// TinyPesa API Key (add this in Render Environment Variables)
const API_KEY = process.env.TINYPESA_API_KEY;

// Your Till Number
const TILL_NUMBER = "1714273";

app.get("/", (req, res) => {
  res.send("ShopPay Prompt - M-Pesa STK Push service is running.");
});

app.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: "Phone and amount are required." });
  }

  try {
    const response = await axios.post(
      "https://api.tinypesa.com/api/v1/express/initialize",
      {
        amount: Number(amount),
        msisdn: phone,
        account_no: "ShopPay",
        till: TILL_NUMBER
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "STK Push failed",
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
