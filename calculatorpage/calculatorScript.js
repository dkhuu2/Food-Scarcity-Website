document.getElementById("wastePercentage").addEventListener("input", function () {
  document.getElementById("wasteDisplay").textContent = this.value + "%";
});

function calculateWaste() {
  // Get user inputs
  const householdSize = Number(document.getElementById("householdSize").value);
  const grocerySpending = Number(document.getElementById("grocerySpending").value);
  const wastePercentage = Number(document.getElementById("wastePercentage").value);

  // Validate inputs
  if (
    isNaN(householdSize) || householdSize <= 0 ||
    isNaN(grocerySpending) || grocerySpending <= 0 ||
    isNaN(wastePercentage) || wastePercentage < 0 || wastePercentage > 100
  ) {
    alert("Please enter valid numbers for all inputs.");
    return;
  }

  // Constants from the article
  const averageWastePerPerson = 365; // 1 pound/day * 365 days
  const annualWasteCost = 1500; // Per family of four

  // Calculations
  const yearlySpending = grocerySpending * 12;
  const wastedFoodCost = (wastePercentage / 100) * yearlySpending;
  const wastedFoodPounds = (wastePercentage / 100) * (averageWastePerPerson * householdSize);

  // Update result
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
      <h3>Results</h3>
      <p>Your household wastes approximately <strong>${wastedFoodPounds.toFixed(2)} pounds</strong> of food annually.</p>
      <p>This amounts to about <strong>$${wastedFoodCost.toFixed(2)}</strong> worth of groceries each year.</p>
      <p>You could save money and reduce waste by planning meals, composting, and buying only what you need.</p>
  `;
}
