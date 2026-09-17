const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/stkpush", async (req, res) => {
  try {
    let { phone, amount } = req.body;

    // Convert 07XXXXXXXX to 2547XXXXXXXX
    phone = phone.replace(/^0/, "254");

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

    console.log(response.data);
    res.json({ message: "STK Push Sent", data: response.data });

  } catch (error) {
    console.log("TinyPesa Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Payment failed",
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
