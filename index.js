const express = require("express");
const TinyPesa = require("tinypesa");

const app = express();

app.use(express.json());
app.use(express.static("."));

const tinypesa = new TinyPesa({
  api_key: process.env.TINYPESA_API_KEY
});

app.post("/stkpush", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    const response = await tinypesa.stkPush({
      amount: Number(amount),
      msisdn: phone,
      account_reference: "ShopPay",
      callback_url: "https://shoppaypromt-zxzw.onrender.com/callback"
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/callback", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
