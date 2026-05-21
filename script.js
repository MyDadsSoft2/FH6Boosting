function scrollToOrder() {
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function setOrder(product, amount) {
  document.getElementById("product").value = product;
  document.getElementById("amount").value = amount;
  scrollToOrder();
}

async function submitOrder() {
  const discord = document.getElementById("discord").value;
  const product = document.getElementById("product").value;
  const amount = document.getElementById("amount").value;
  const honeypot = document.getElementById("website").value;

  if (honeypot) return; // anti-bot trap

  const res = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      discord,
      product,
      amount
    })
  });

  if (res.ok) {
    alert("Order sent!");
  } else {
    alert("Error sending order");
  }
}