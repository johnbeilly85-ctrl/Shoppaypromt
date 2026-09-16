
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
status.style.color="red"
