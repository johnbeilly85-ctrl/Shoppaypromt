const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/stkpush", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    return res.json({
      success: true,
      message: "Pay to ShopPay Prompt Till 1714273",
      till: "1714273",
      businessName: "ShopPay Prompt",
      phone,
      amount
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`ShopPay Prompt running on port ${PORT}`);
});
