function calculateBudget() {
  const income = Number(document.getElementById("income").value);
  const expenses = Number(document.getElementById("expenses").value);

  const savings = income - expenses;

  const result = document.getElementById("result");

  if (!income || !expenses) {
    result.textContent = "⚠️ Please enter both values";
    result.style.color = "red";
    return;
  }

  result.textContent = `💵 Your monthly savings: ₹ ${savings}`;
  result.style.color = savings >= 0 ? "green" : "red";
}


