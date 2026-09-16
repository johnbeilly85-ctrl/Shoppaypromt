
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h1>ShopPay Prompt</h1>
    <p>M-Pesa STK Push service is running.</p>
  `);
});

app.post("/stk", (req, res) => {
  const { phone, amount } = req.body;

  res.json({
    success: true,
    message: `STK request received for ${phone} amount KES ${amount}`
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
