const form = document.querySelector("#loan-form");

form.addEventListener("submit", calculateResults);

const output = document.querySelector("#output");
output.style.display = "none";
const loader = document.querySelector("#loader");
loader.style.display = "none";
loader.style.position = "relative";

const img = document.querySelector("img");
img.style.textAlign = "center";
img.style.width = "150px";
img.style.height = "150px";

function calculateResults(e) {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById("loader").style.display = "inline";

    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("output").style.display = "inline-block";
    }, 2000);
  } else {
    document.getElementById("loader").style.display = "inline";
    alert("Заполните все поля!");

    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("warnings").style.display = "inline-block";
    }, 2000);

    setTimeout(function () {
      document.getElementById("warnings").style.display = "none";
    }, 4000);
  }

  document.getElementById("output").style.display = "none";

  e.preventDefault();
}
