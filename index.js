const axios = require("axios");

app.post("/stk", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    const response = await axios.post(
      "https://api.tinypesa.com/v1/stk/push",
      {
        msisdn: phone,
        amount: Number(amount),
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
  } catch (error) {
    res.status(500).json({
      message: "Payment failed",
      error: error.response?.data || error.message
    });
  }
});
