const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.static("."));

app.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await axios.post(
      "https://tinypesa.com/api/v1/express/initialize",
      {
        amount: Number(amount),
        msisdn: phone,
        account_no: "ShopPay"
      },
      {
        headers: {
          Apikey: process.env.TINYPESA_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ message: "STK Push sent successfully." });
  } catch (error) {
    res.status(500).json({
      message: "STK Push failed.",
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
