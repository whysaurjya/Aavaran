/**
 * AAVARAN - CGPA & SGPA Academic Engine
 * Multi-University Grading Scale & Target Simulator
 */

document.addEventListener('DOMContentLoaded', function () {
    const semSelect = document.getElementById('pc-pest-select');
    const goalSelect = document.getElementById('pc-pesticide-select');
    const currentCgpaInput = document.getElementById('pc-water-volume-input');
    const prevCreditsInput = document.getElementById('pc-area-input');
    const semCreditsSelect = document.getElementById('pc-water-unit-select');
    const targetSgpaSelect = document.getElementById('pc-area-unit-select');

    const resultQty = document.getElementById('pc-result-qty');
    const resultUnit = document.getElementById('pc-result-unit');
    const resultProduct = document.getElementById('pc-result-product');

    function calculateCGPA() {
        const currentCGPA = parseFloat(currentCgpaInput ? currentCgpaInput.value : 8.8) || 8.8;
        const prevCredits = parseFloat(prevCreditsInput ? prevCreditsInput.value : 80) || 80;
        const semCredits = 20; // standard semester credit
        
        let expectedSGPA = 9.2;
        if (goalSelect && goalSelect.value === 'deans') expectedSGPA = 9.5;
        else if (goalSelect && goalSelect.value === 'distinction') expectedSGPA = 8.8;
        else if (goalSelect && goalSelect.value === 'firstclass') expectedSGPA = 8.0;

        const totalEarnedPoints = (currentCGPA * prevCredits) + (expectedSGPA * semCredits);
        const totalCredits = prevCredits + semCredits;
        const newCGPA = totalCredits > 0 ? (totalEarnedPoints / totalCredits) : currentCGPA;

        if (resultQty) resultQty.textContent = newCGPA.toFixed(2);
        if (resultUnit) resultUnit.textContent = '/ 10.0';
        if (resultProduct) {
            if (newCGPA >= 9.0) {
                resultProduct.textContent = "🏆 Dean's List & High Distinction";
            } else if (newCGPA >= 8.0) {
                resultProduct.textContent = "⭐ First Class with Distinction";
            } else {
                resultProduct.textContent = "✅ Good Academic Standing";
            }
        }
    }

    if (currentCgpaInput) currentCgpaInput.addEventListener('input', calculateCGPA);
    if (prevCreditsInput) prevCreditsInput.addEventListener('input', calculateCGPA);
    if (goalSelect) goalSelect.addEventListener('change', calculateCGPA);
    if (semSelect) semSelect.addEventListener('change', calculateCGPA);

    calculateCGPA();
});