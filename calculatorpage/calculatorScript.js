document.getElementById("wastePercentage").addEventListener("input", function () {
  document.getElementById("wasteDisplay").textContent = this.value + "%";
});

function calculateWaste() {
  // Get user inputs
  const householdSize = Number(document.getElementById("householdSize").value);
  const grocerySpending = Number(document.getElementById("grocerySpending").value);
  const wastePercentage = Number(document.getElementById("wastePercentage").value);
  const leftoversWaste = Number(document.getElementById("leftoversWaste").value);
  const expiredFood = Number(document.getElementById("expiredFood").value);
  const unusedPurchases = Number(document.getElementById("unusedPurchases").value);
  const discardUglyProduce = document.getElementById("discardUglyProduce").checked;

  // Validate inputs
  if (
    isNaN(householdSize) || householdSize <= 0 ||
    isNaN(grocerySpending) || grocerySpending <= 0 ||
    isNaN(wastePercentage) || wastePercentage < 0 || wastePercentage > 100 ||
    isNaN(leftoversWaste) || leftoversWaste < 0 ||
    isNaN(expiredFood) || expiredFood < 0 ||
    isNaN(unusedPurchases) || unusedPurchases < 0
  ) {
    alert("Please enter valid numbers for all inputs.");
    return;
  }

  // Constants from the article
  const averageWastePerPerson = 365; // 1 pound/day * 365 days
  const annualWasteCost = 1500; // Per family of four

  // Calculate waste based on general percentage
  const yearlySpending = grocerySpending * 12;
  const wastedFoodCost = (wastePercentage / 100) * yearlySpending;
  const wastedFoodPounds = (wastePercentage / 100) * (averageWastePerPerson * householdSize);

  // Calculate additional waste factors
  const yearlyLeftoversWaste = leftoversWaste * 52; // Weekly to annual
  const yearlyExpiredFood = expiredFood * 12; // Monthly to annual
  const yearlyUnusedPurchases = unusedPurchases * 12; // Monthly to annual

  // Adding waste from "ugly" produce discard (assuming 10% waste)
  const uglyProduceWaste = discardUglyProduce ? (averageWastePerPerson * householdSize * 0.1) : 0;

  // Total waste calculation
  const totalWastePounds = wastedFoodPounds + yearlyLeftoversWaste + yearlyExpiredFood + yearlyUnusedPurchases + uglyProduceWaste;
  const totalWasteCost = wastedFoodCost + (yearlyLeftoversWaste * (grocerySpending / 52)) + (yearlyExpiredFood * (grocerySpending / 12)) + (yearlyUnusedPurchases * (grocerySpending / 12));

  // Update result
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h3>Results</h3>
    <p>Your household wastes approximately <strong>${totalWastePounds.toFixed(2)} pounds</strong> of food annually.</p>
    <p>This amounts to about <strong>$${totalWasteCost.toFixed(2)}</strong> worth of groceries each year.</p>
    <p>Consider planning meals better, using leftovers, reducing food waste by not over-purchasing, and buying only what you need!</p>
  `;
}
