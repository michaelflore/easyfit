/*
Test bed

var bmi = calculateBmiMetric(1.8, 80);
console.log("your bmi is: " + bmi + " and you are in category: " + categorizeRezult(bmi));

bmi = calculateBmiImperial(68, 160)
console.log("your bmi is: " + bmi + " and you are in category: " + categorizeRezult(bmi));
*/

// height in meters , weight in kg
const calculateBmiMetric = (heightMeters, weightKg) => {
    let bmi = weightKg / (heightMeters ** 2);
    return Math.round(bmi * 100) / 100;
};

// height in inches , weight in pounds
const calculateBmiImperial = (heightInches, weightPounds) => {
    var bmi = (weightPounds / (heightInches ** 2)) * 703;
    return Math.round(bmi * 100) / 100;
};


// BMI Categories:
// Underweight: 18.5 or lower
// Normal weight: 18.5–25
// Overweight: 25–30
// Obesity: 30 and up
const categorizeResult = (bmi) => {
    if (bmi <= 18.5) return ["Underweight", "You are below a healthy weight. You need to consume more calories."];
    if (18.5 < bmi && bmi <= 25) return ["Normal", "Congratulations! You are at a healthy weight."];
    if (25 < bmi && bmi <= 30) return ["Overweight", "You are above a healthy weight. You need to watch your diet and exercise, or you will become obese."];
    if (bmi > 30) return ["Obese", "You are extremely overweight. You need to take drastic measures now, or medical intervention will be required."];
};

module.exports = {
    bmiImperial: calculateBmiImperial,
    bmiMetric: calculateBmiMetric,
    bmiResult: categorizeResult
};