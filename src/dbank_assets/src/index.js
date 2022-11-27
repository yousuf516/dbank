import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  const currentAmout = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmout * 100) / 100;
});

document.querySelector("form").addEventListener("submit", async function(event) {
  const button = event.target.querySelector("#submit-btn")
  button.setAttribute("disabled", true);

  let inputAmount = parseFloat(document.getElementById("input-amount").value);
  let withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  console.log(inputAmount)


  if (inputAmount > 0) {
    await dbank.topUp(inputAmount);
  }

  if (withdrawalAmount > 0) {
    await dbank.withdrawl(withdrawalAmount);
  }
  
  update();

  await dbank.compound();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");

  event.preventDefault();
});

async function update() {
  const currentAmout = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmout * 100) / 100;
}