const activityConstant = (activityLevel) => {
    if (activityLevel == 1) return 1.2;
    if (activityLevel == 2) return 1.375;
    if (activityLevel == 3) return 1.55;
    if (activityLevel == 4) return 1.725;
}

// calculates the Total Daily Energy Expenditure (TDEE).
const calculatedTDEE = (heightMeters, weightKg, ageYears, gender, activityLevel) => {
    var reeConstant = 5
    if (gender == "Female") {
        reeConstant = -161
    }
    var wVal = weightKg * 10;
    var hVal = heightMeters * 100 * 6.25;
    var aVal = ageYears * 5;
    return Math.ceil((wVal + hVal - aVal + reeConstant) * activityConstant(activityLevel));
};

// Any shifts in weight are recomended to be in the 20% area.
const calorieRecomandation = (currentWeight, goalWeight, valTDEE) => {
    if (goalWeight > currentWeight) return valTDEE + valTDEE * 0.2;
    if (goalWeight < currentWeight) return valTDEE - valTDEE * 0.2;
    if (goalWeight == currentWeight) return valTDEE;
}

// 1 kg is about 7700 calories.
const estimatedTime = (currentWeight, goalWeight, calorieRec, valTDEE) => {
    var weightChange = Math.abs(currentWeight - goalWeight);
    var calorieChange = Math.abs(valTDEE - calorieRec);
    return Math.ceil(weightChange * 7700 / calorieChange / 7);
}

// Depending on activity, recommended is between 0.8 to 1.4 grams per kg of body weight.
const recommendedProtein = (weightKg, activityLevel) => {
    if (activityLevel == 1) return weightKg * 0.85;
    if (activityLevel == 2) return weightKg * 0.95;
    if (activityLevel == 3) return weightKg * 1.25;
    if (activityLevel == 4) return weightKg * 1.4;
}

// Depending on goal, it's recommended to consume between 25% - 35% of daily calories from fat.
const recommendedFat = (weightKg, goalWeight, valTDEE) => {
    if (weightKg == goalWeight) return Math.floor(valTDEE * 0.30 / 9);
    if (weightKg > goalWeight) return Math.floor(valTDEE * 0.26 / 9);
    if (weightKg < goalWeight) return Math.floor(valTDEE * 0.35 / 9);
}

const convertGramsToOz = (weightKg) => {
    return weightKg * 0.035274;
}

const getGoalVerb = (weightKg, goalWeight) => {
    if (weightKg == goalWeight) return "maintain";
    if (weightKg > goalWeight) return "lose";
    if (weightKg < goalWeight) return "gain";
}

// 1g Protein = 4 Calories, 1g Carbohydrate = 4 Calories, 1g Fat = 9 Calories
const generateSuggestion = (heightMeters, weightKg, ageYears, gender, activityLevel, goalWeight) => {
    var valTDEE = calculatedTDEE(heightMeters, weightKg, ageYears, gender, activityLevel);
    var calorieRec = calorieRecomandation(weightKg, goalWeight, valTDEE);
    var estTime = estimatedTime(weightKg, goalWeight, calorieRec, valTDEE);
    var proteinGrams = Math.ceil(recommendedProtein(weightKg, activityLevel));
    var fatGrams = recommendedFat(weightKg, goalWeight, calorieRec);
    var carbsGrams = (calorieRec - proteinGrams * 4 - fatGrams * 9) / 4;
    var goalVerb = getGoalVerb(weightKg, goalWeight);

    if (goalVerb === "maintain") {
        // console.log("\nYou are a " + gender + " and your activity rating is " + activityLevel + " so your TDEE value is: " + valTDEE + "");
        // console.log("To maintain a weight of " + weightKg + "kg you need to consume " + calorieRec + " calories daily.");
        return {
            maintain: true,
            calorieRec: calorieRec,
            tdee: valTDEE
        };
    } else {
        // console.log("\nYou are a " + gender + " and your activity rating is " + activityLevel + " so your TDEE value is: " + valTDEE + "");
        // console.log("To get from " + weightKg + "kg to " + goalWeight + "kg you need to consume " + calorieRec + " calories daily (" + goalVerb + " an extra " + Math.abs(valTDEE - calorieRec) + " calories).");
        // console.log("You should be able to " + goalVerb + " weight and reach your goal in about " + estTime + " weeks.\n");

        // console.log("Your recommended macros are:");
        // console.log("Protein: " + proteinGrams + " grams (" + convertGramsToOz(proteinGrams).toFixed(2) + " oz).");
        // console.log("Fat:     " + fatGrams + " grams (" + convertGramsToOz(fatGrams).toFixed(2) + " oz).");
        // console.log("Carbs:   " + carbsGrams + " grams (" + convertGramsToOz(carbsGrams).toFixed(2) + " oz).");
        return {
            maintain: false,
            tdee: valTDEE,
            calorieRec: calorieRec,
            goalVerb: goalVerb,
            extraCal: Math.abs(valTDEE - calorieRec),
            estTime: estTime,
            macros: [
                {
                    name: 'Protein',
                    grams: proteinGrams,
                    oz: convertGramsToOz(proteinGrams).toFixed(2)
                },
                {
                    name: 'Fat',
                    grams: fatGrams,
                    oz: convertGramsToOz(fatGrams).toFixed(2)
                },
                {
                    name: 'Carbs',
                    grams: carbsGrams,
                    oz: convertGramsToOz(carbsGrams).toFixed(2)
                }
            ]
        };
    }
}

export default generateSuggestion;

/* module.exports = {
    macroSuggestion: generateSuggestion
}; */


//////////////// Test bed ////////////////

/* console.log(activityConstant(1));
console.log(activityConstant(2));
console.log(activityConstant(3));
console.log(activityConstant(4)); */

/*
console.log(calculatedTDEE(1.8, 85, 25, "male", 3));
console.log(calculatedTDEE(2.8, 55, 25, "female", 3));
console.log(calculatedTDEE(1.8, 85, 25, "male", 2));
console.log(calculatedTDEE(2.8, 55, 25, "female", 2)); */

/* console.log(calorieRecomandation(100, 80, 2500));
console.log(calorieRecomandation(80, 180, 2500));
console.log(calorieRecomandation(45, 80, 2500));
console.log(calorieRecomandation(55, 55, 2500)); */

/* console.log(estimatedTime(60, 75, 1500));
console.log(estimatedTime(155, 57, 3500));
console.log(estimatedTime(105, 905, 2500));  */

//generateSuggestion(1.83, 88, 29, "male", 3, 87);
//generateSuggestion(1.83, 88, 29, "male", 3, 87);
//generateSuggestion(1.83, 75, 29, "male", 2, 88);
//generateSuggestion(1.83, 88, 29, "female", 4, 75);