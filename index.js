<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ShopPay Prompt</title>

<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}
body{
background:#f5f5f5;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
padding:20px;
}
.card{
background:#fff;
padding:30px;
border-radius:15px;
box-shadow:0 10px 25px rgba(0,0,0,.15);
width:100%;
max-width:400px;
}
h1{
text-align:center;
color:#16a34a;
margin-bottom:10px;
}
p{
text-align:center;
color:#555;
margin-bottom:20px;
}
input{
width:100%;
padding:14px;
margin-bottom:15px;
border:1px solid #ddd;
border-radius:8px;
font-size:16px;
}
button{
width:100%;
padding:15px;
background:#16a34a;
color:white;
border:none;
border-radius:8px;
font-size:18px;
cursor:pointer;
}
button:hover{background:#15803d;}
#status{
margin-top:20px;
text-align:center;
font-weight:bold;
}
.footer{
margin-top:20px;
text-align:center;
font-size:13px;
color:#777;
}
</style>
</head>

<body>

<div class="card">
<h1>ShopPay Prompt</h1>
<p>Pay securely with M-Pesa STK Push.</p>

<input type="tel" id="phone" placeholder="2547XXXXXXXX">
<input type="number" id="amount" placeholder="Amount (KES)">

<button onclick="payNow()">Pay with M-Pesa</button>

<div id="status"></div>

<div class="footer">
Powered by ShopPay Prompt
</div>
</div>

<script>
async function payNow(){
const phone=document.getElementById("phone").value.trim();
const amount=document.getElementById("amount").value.trim();
const status=document.getElementById("status");

if(!phone || !amount){
status.style.color="red";
status.innerText="Enter phone number and amount.";
return;
}

status.style.color="#16a34a";
status.innerText="Sending STK Push...";

try{
const res=await fetch("https://shoppomt.onrender.com/stkpush",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({phone,amount})
});

const data=await res.json();

status.style.color="#16a34a";
status.innerText=data.message || "STK Push sent. Check your phone.";
}catch(err){
status.style.color="red";
status.innerText="Payment request failed.";
}
}
</script>

</body>
</html>
