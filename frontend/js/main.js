function calculateBudget() {
      // Get input values and convert to numbers
const income = Number(document.getElementById("income").value;
const expenses = Number(document.getElementById("expenses").value);

      // Calculate savings
const savings = income - expenses;

      // Get result element
const result 
document.getElementById("result");

      // Validation
      if (!income || !expenses) {
        result.textContent = "⚠️ Please enter both values";
        result.style.color = "red";
        return;
}

      // Show result
      result.textContent = `💵 Your monthly savings: ₹ ${savings.toLocaleString("en-IN")}`;
      
      // Color feedback
result.style.color = savings >= 0 ? "green" : "red";
}