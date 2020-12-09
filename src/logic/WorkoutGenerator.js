

// 1 kg is about 7700 calories.
const estimatedTimeWithWorkout = (currentWeight, goalWeight, calorieRec, valTDEE) => {
    var weightChange = Math.abs(currentWeight - goalWeight) + 0.001;
    var calorieChange = Math.abs(valTDEE - calorieRec) + 1;
    return Math.ceil(weightChange * 7700 / calorieChange / 7);
};

const burnedCalories = (duration, MET, weight) => {
    return (duration * MET * 3.5 * weight) / 200;
};

const generateWorkout = (weightKg, goalWeight, calorieRec, valTDEE, activityLevel) => {
    if (goalWeight < weightKg) {
        //lose weight
        if (activityLevel == 3) {
            // group A - somewhat active
            var duration = 200;
            var intensity = 6;
            var extraCalories = burnedCalories(duration, intensity, weightKg);
            var newEstimate = estimatedTimeWithWorkout(weightKg, goalWeight, (calorieRec - extraCalories), valTDEE);
            return "You are trying to lose weight, which means you should maximize both aerobic and cardio exercises. \n\
 These are meant to burn fat and at the same time bulk up and build muscle.\n\
 Bigger muscles means burning more calories daily even while resting and it ensures a fast progress towards weight loss. \n\
 Spend " + duration + " minutes a week doing exercise from Group A.\n\
 With the recommended exercise you will burn an extra " + parseInt(extraCalories) + " calories a week and reach your goal in " + newEstimate + " weeks."

        } else if (activityLevel == 1 || activityLevel == 2) {
            // group A - not active
            var duration = 250;
            var intensity = 7;
            var extraCalories = burnedCalories(duration, intensity, weightKg);
            var newEstimate = estimatedTimeWithWorkout(weightKg, goalWeight, (calorieRec - extraCalories), valTDEE);
            return "You are trying to lose weight, which means you should maximize both aerobic and cardio exercises. \n\
These are meant to burn fat and at the same time bulk up and build muscle.\n\
Bigger muscles means burning more calories daily even while resting and it ensures a fast progress towards weight loss. \n\
Spend " + duration + " minutes a week doing exercise from Group A.\n\
With the recommended exercise you will burn an extra " + parseInt(extraCalories) + " calories a week and reach your goal in " + newEstimate + " weeks."
        } else {
            // group B - active
            var duration = 250;
            var intensity = 7;
            var extraCalories = burnedCalories(duration, intensity, weightKg);
            var newEstimate = estimatedTimeWithWorkout(weightKg, goalWeight, (calorieRec - extraCalories), valTDEE);
            return "You are pretty active already. To ensure proper workout routine, please be sure to include all four exercise types:\n\
Aerobic exercise, Strength exercise, Balance exercise and Flexibility exercise.\n\
You can find more information in Exercise Group B\n\
For comparison, pending about " + duration + " minutes a week doing exercise from Group B, will help burn an extra " + parseInt(extraCalories) + " calories a week and reach your goal in " + newEstimate + " weeks.";

        }
    } else if (goalWeight > weightKg) {
        // gain weight - group C
        var duration = 150;
        var intensity = 6;
        var extraCalories = burnedCalories(duration, intensity, weightKg);
        return "You are trying to gain weight, which means you should minimize aerobic and cardio exercises. \n\
These are meant to burn fat and tone muscle, not bulk you up.\n\
You don’t have to avoid them entirely, though. You can do these exercises in moderation to tone your muscles. \n\
Spend " + duration + " minutes a week doing exercise from Group C.\n\
With the recommended exercise you will have to adjust your diet with an extra " + parseInt(extraCalories / 7) + " calories daily."
    } else if (goalWeight == weightKg) {
        // maintain weight - group B
        var duration = 150;
        var intensity = 4;
        var extraCalories = burnedCalories(duration, intensity, weightKg);
        return "You are trying to maintain weight, which means you should have balanced aerobic and cardio exercises. \n\
Spend " + duration + " minutes a week doing exercise from Group B.\n\
With the recommended exercise you will have to adjust your diet with an extra " + parseInt(extraCalories / 7) + " calories daily."
    }
};

export default generateWorkout;

// TestBed
//weightKg, goalWeight, calorieRec, valTDEE, activityLevel
console.log("activity 5\n" + generateWorkout(100, 80, 3000, 3400, 5) + "\n");
console.log("activity 4\n" + generateWorkout(100, 80, 3000, 3400, 4) + "\n");
console.log("activity 3\n" + generateWorkout(100, 80, 3000, 3400, 3) + "\n");
console.log("activity 2\n" + generateWorkout(100, 80, 3000, 3400, 2) + "\n");
console.log("activity 1\n" + generateWorkout(100, 80, 3000, 3400, 1) + "\n");
console.log("gain weight\n" + generateWorkout(65, 85, 3400, 3000, 1) + "\n");
console.log("gain weight\n" + generateWorkout(65, 85, 3400, 3000, 2) + "\n");
console.log("gain weight\n" + generateWorkout(65, 85, 3400, 3000, 3) + "\n");
console.log("gain weight\n" + generateWorkout(65, 85, 3400, 3000, 4) + "\n");
console.log("gain weight\n" + generateWorkout(65, 85, 3400, 3000, 5) + "\n");
console.log("maintain weight\n" + generateWorkout(85, 85, 3000, 3000, 1) + "\n");
console.log("maintain weight\n" + generateWorkout(85, 85, 3000, 3000, 2) + "\n");
console.log("maintain weight\n" + generateWorkout(85, 85, 3000, 3000, 3) + "\n");
console.log("maintain weight\n" + generateWorkout(85, 85, 3000, 3000, 4) + "\n");
console.log("maintain weight\n" + generateWorkout(85, 85, 3000, 3000, 5) + "\n");

console.log("activity 5\n" + generateWorkout(120, 70, 2200, 2800, 5) + "\n");
console.log("activity 4\n" + generateWorkout(120, 70, 2200, 2800, 4) + "\n");
console.log("activity 3\n" + generateWorkout(120, 70, 2200, 2800, 3) + "\n");
console.log("activity 2\n" + generateWorkout(120, 70, 2200, 2800, 2) + "\n");
console.log("activity 1\n" + generateWorkout(120, 70, 2200, 2800, 1) + "\n");
console.log("gain weight\n" + generateWorkout(70, 120, 2800, 2200, 1) + "\n");
console.log("gain weight\n" + generateWorkout(70, 120, 2800, 2200, 2) + "\n");
console.log("gain weight\n" + generateWorkout(70, 120, 2800, 2200, 3) + "\n");
console.log("gain weight\n" + generateWorkout(70, 120, 2800, 2200, 4) + "\n");
console.log("gain weight\n" + generateWorkout(70, 120, 2800, 2200, 5) + "\n");
console.log("maintain weight\n" + generateWorkout(100, 100, 2700, 2700, 1) + "\n");
console.log("maintain weight\n" + generateWorkout(100, 100, 2700, 2700, 2) + "\n");
console.log("maintain weight\n" + generateWorkout(100, 100, 2700, 2700, 3) + "\n");
console.log("maintain weight\n" + generateWorkout(100, 100, 2700, 2700, 4) + "\n");
console.log("maintain weight\n" + generateWorkout(100, 100, 2700, 2700, 5) + "\n");