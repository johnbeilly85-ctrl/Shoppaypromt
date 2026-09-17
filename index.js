const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await axios.post(
      "https://tinypesa.com/api/v1/stk/push",
      {
        amount: Number(amount),
        msisdn: phone,
        account_reference: "ShopPay",
        callback_url: "https://shoppaypromt-zxzw.onrender.com/callback"
      },
      {
        headers: {
          ApiKey: process.env.TINYPESA_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      message: "STK Push sent successfully.",
      data: response.data
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Payment failed.",
      error: error.response?.data || error.message
    });
  }
});

app.post("/callback", (req, res) => {
  console.log("TinyPesa Callback:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
