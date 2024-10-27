// Enable or disable the submit button based on input fields
const inputs = document.querySelectorAll('input');
const submitButton = document.getElementById('submit-button');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const allFilled = [...inputs].every(input => input.value);
        submitButton.disabled = !allFilled;
    });
});

submitButton.addEventListener('click', function () {
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const emi = parseFloat(document.getElementById('emi').value);
    const savings = parseFloat(document.getElementById('savings').value);

    // Calculate financial health score
    const score = calculateFinancialHealthScore(income, expenses, emi, savings);
    
    // Display the score
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Your Financial Health Score: ${score.toFixed(2)}%`;

    // Update the speed bar
    updateSpeedBar(score);
});

function calculateFinancialHealthScore(income, expenses, emi, savings) {
    let score = 0;

    // Calculate various financial ratios
    const savingsRate = (savings / income) * 100; // Savings as a percentage of income
    const expenseRatio = ((expenses + emi) / income) * 100; // Total expenses including EMI
    const debtRatio = (emi / income) * 100; // EMI as a percentage of income

    // Score calculation
    score += Math.min(savingsRate, 100); // Max score for savings rate is 100
    score += (100 - Math.min(expenseRatio, 100)); // Lower expenses increase score
    score += (100 - Math.min(debtRatio, 100)); // Lower debt ratio increases score

    // Average the score and return
    return score / 3; // Scale to 0-100%
}

function updateSpeedBar(score) {
    const scoreIndicator = document.getElementById('score-indicator');

    // Set width based on score
    const width = score; // Score is already between 0-100
    scoreIndicator.style.width = `${width}%`;

    // Set background color based on score
    if (score <= 33) {
        scoreIndicator.style.backgroundColor = 'red'; // Poor financial health
    } else if (score <= 66) {
        scoreIndicator.style.backgroundColor = 'yellow'; // Moderate financial health
    } else {
        scoreIndicator.style.backgroundColor = 'green'; // Good financial health
    }
}
