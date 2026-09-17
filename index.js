const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/stk", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    const response = await axios.post(
      "https://api.tinypesa.com/v1/stk/push",
      {
        amount: Number(amount),
        msisdn: phone,
        account_reference: "ShopPay",
        callback_url: "https://shoppaypromt.onrender.com/callback"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "ApiKey": process.env.TINYPESA_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      message: "Payment failed",
      error: err.response?.data || err.message
    });
  }
});

app.post("/callback", (req, res) => {
  console.log("Callback:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`ShopPay running on port ${PORT}`);
});
