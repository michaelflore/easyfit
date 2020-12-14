import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

// I had to manually hard code the UI for workout advice. That's all this is. 
const workoutDetails = {
    a: [
        (
        <Fragment>
            <Typography>Aerobic exercise - Aerobic exercises, such as running, swimming or dancing, are activities that work your cardiovascular system.</Typography>
            <br/>
            <Typography>Strength exercise - Strength exercises, such as weight lifting, push-ups and crunches, work your muscles by using resistance.</Typography>
            <br/>
            <Typography>You should spend about 30% of the recommended workout time on Aerobic exercise, and about 70% of the time on Strength exercise.</Typography>
        </Fragment>
        ),
        (
            <Fragment>
                <Typography>Recommended Aerobic:</Typography>
                <br/>
                <Typography>HIGH INTENSITY INTERVALS</Typography>
                <Typography>This type of cardio consists of short fast bursts of power followed by a recovery period. The purpose is to spike your heart rate higher than it could be during a normal long run to over train heart rate and body. These types of workouts usually are less than 30 minutes. This kind of exercise causes your body to burn fat for 24-48 hours after you finish your training.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=fxx2Uc0AjFk&ab_channel=GlobalTriathlonNetwork</Typography>
                <Typography>https://www.youtube.com/watch?v=_9Wls5hni0E&ab_channel=FitnessBlender</Typography>
                <br/>
                <Typography>LONG SLOW DISTANCE</Typography>
                <Typography>Any cardio performed at a steady heart rate for 30+ minutes is considered long slow distance. This type of cardio burns fat during your workout which is why it's important to do no less than 30 minutes at a heart rate in the fat burning zone, which is 60-70% of your max heart rate.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=-YJXpabrX4k&ab_channel=POPSUGARFitness</Typography>
                <Typography>https://www.youtube.com/watch?v=W5IiasNutB8&ab_channel=BullyJuice</Typography>
            </Fragment>
        ),
        (
            <Fragment>
                <Typography>Recommended Strength Exercise</Typography>
                <br/>
                <Typography>Strength training in this case is considered resistance training. For something to be called resistance training your body has to resist an added stressor. Think weight lifting. Your body’s job is to resist the weight crushing you to the ground. When you practice resistance training your muscles break down and with proper recovery rebuild stronger than before; hence it gets the name strength training. Strength training is important for bone, muscle and cardiovascular health but its claim to fame when adding it into your training plan is the spike in your body’s metabolism since muscle burns more calories at rest than fat.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=mUns8O4YL5M&ab_channel=JoannaSohOfficial</Typography>
                <Typography>https://www.youtube.com/watch?v=WIHy-ZnSndA&ab_channel=HASfit</Typography>
                <Typography>https://www.youtube.com/watch?v=U9W6cU-c56c&ab_channel=TomMerrick</Typography>
            </Fragment>
        )
    ],

    b: [
        <Typography>The balanced workout is great for general longevity and it includes Aerobic exercise, Strength exercise, Balance exercise and Flexibility exercise. You should spend about 40% of the recommended workout time on Aerobic exercise, about 40% of the time on Strength exercise and about 20% of the time on Balance exercise and Flexibility exercise.</Typography>,
        (
        <Fragment>
            <Typography>Recommended Aerobic:</Typography>
            <br/>
            <Typography>HIGH INTENSITY INTERVALS</Typography>
            <Typography>This type of cardio consists of short fast bursts of power followed by a recovery period. The purpose is to spike your heart rate higher than it could be during a normal long run to over train heart rate and body. These types of workouts usually are less than 30 minutes. This kind of exercise causes your body to burn fat for 24-48 hours after you finish your training.</Typography>
            <br/>
            <Typography>Examples:</Typography>
            <Typography>https://www.youtube.com/watch?v=fxx2Uc0AjFk&ab_channel=GlobalTriathlonNetwork</Typography>
            <Typography>https://www.youtube.com/watch?v=_9Wls5hni0E&ab_channel=FitnessBlender</Typography>
            <br/>
            <Typography>LONG SLOW DISTANCE</Typography>
            <Typography>Any cardio performed at a steady heart rate for 30+ minutes is considered long slow distance. This type of cardio burns fat during your workout which is why it's important to do no less than 30 minutes at a heart rate in the fat burning zone, which is 60-70% of your max heart rate.</Typography>
            <br/>
            <Typography>Examples:</Typography>
            <Typography>https://www.youtube.com/watch?v=-YJXpabrX4k&ab_channel=POPSUGARFitness</Typography>
            <Typography>https://www.youtube.com/watch?v=W5IiasNutB8&ab_channel=BullyJuice</Typography>
        </Fragment>
        ),
        (
            <Fragment>
                <Typography>Recommended Strength Exercise</Typography>
                <br/>
                <Typography>Strength training in this case is considered resistance training. For something to be called resistance training your body has to resist an added stressor. Think weight lifting. Your body’s job is to resist the weight crushing you to the ground. When you practice resistance training your muscles break down and with proper recovery rebuild stronger than before; hence it gets the name strength training. Strength training is important for bone, muscle and cardiovascular health but its claim to fame when adding it into your training plan is the spike in your body’s metabolism since muscle burns more calories at rest than fat.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=mUns8O4YL5M&ab_channel=JoannaSohOfficial</Typography>
                <Typography>https://www.youtube.com/watch?v=WIHy-ZnSndA&ab_channel=HASfit</Typography>
                <Typography>https://www.youtube.com/watch?v=U9W6cU-c56c&ab_channel=TomMerrick</Typography>
            </Fragment>
        ),
        (
            <Fragment>
                <Typography>Recommended Flexibility and Balance Exercises</Typography>
                <br/>
                <Typography>This can be broken down in different forms, from yoga to pilates to barre. Flexibility is extremely important because it gives the muscles the ability to move through a full range of motion. When the body is unable to move through its full range of motion, injury is more likely to occur.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <br/>
                <Typography>Flexibility:</Typography>
                <Typography>https://www.youtube.com/watch?v=KsVwAs9LriQ&ab_channel=YogawithKassandra</Typography>
                <Typography>https://www.youtube.com/watch?v=L_xrDAtykMI&ab_channel=TomMerrick</Typography>
                <Typography>https://www.youtube.com/watch?v=qULTwquOuT4&ab_channel=MadFit</Typography>
                <br/>
                <Typography>Balance:</Typography>
                <Typography>https://www.youtube.com/watch?v=qzq4hjalegc&ab_channel=AskDoctorJo</Typography>
                <Typography>https://www.youtube.com/watch?v=EcK8btsPN9Q&ab_channel=RedefiningStrength</Typography>
            </Fragment>
        )
    ],

    c: [
        (
        <Fragment>
            <Typography>Aerobic exercise - Aerobic exercises, such as running, swimming or dancing, are activities that work your cardiovascular system.</Typography>
            <Typography>Strength exercise - Strength exercises, such as weight lifting, push-ups and crunches, work your muscles by using resistance.</Typography>
            <Typography>You should spend about 15% of the recommended workout time on Aerobic exercise, and about 85% of the time on Strength exercise.</Typography>
        </Fragment>
        ),
        (
            <Fragment>
                <Typography>Recommended Aerobic:</Typography>
                <br/>
                <Typography>HIGH INTENSITY INTERVALS</Typography>
                <Typography>This type of cardio consists of short fast bursts of power followed by a recovery period. The purpose is to spike your heart rate higher than it could be during a normal long run to over train heart rate and body. These types of workouts usually are less than 30 minutes. This kind of exercise causes your body to burn fat for 24-48 hours after you finish your training.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=fxx2Uc0AjFk&ab_channel=GlobalTriathlonNetwork</Typography>
                <Typography>https://www.youtube.com/watch?v=_9Wls5hni0E&ab_channel=FitnessBlender</Typography>
                <br/>
                <Typography>LONG SLOW DISTANCE</Typography>
                <Typography>Any cardio performed at a steady heart rate for 30+ minutes is considered long slow distance. This type of cardio burns fat during your workout which is why it's important to do no less than 30 minutes at a heart rate in the fat burning zone, which is 60-70% of your max heart rate.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=-YJXpabrX4k&ab_channel=POPSUGARFitness</Typography>
                <Typography>https://www.youtube.com/watch?v=W5IiasNutB8&ab_channel=BullyJuice</Typography>
            </Fragment>
        ),
        (
            <Fragment>
                <Typography>Recommended Strength Exercise</Typography>
                <br/>
                <Typography>Strength training in this case is considered resistance training. For something to be called resistance training your body has to resist an added stressor. Think weight lifting. Your body’s job is to resist the weight crushing you to the ground. When you practice resistance training your muscles break down and with proper recovery rebuild stronger than before; hence it gets the name strength training. Strength training is important for bone, muscle and cardiovascular health but its claim to fame when adding it into your training plan is the spike in your body’s metabolism since muscle burns more calories at rest than fat.</Typography>
                <br/>
                <Typography>Examples:</Typography>
                <Typography>https://www.youtube.com/watch?v=1N_zzi2ad04&ab_channel=THENX</Typography>
                <Typography>https://www.youtube.com/watch?v=95846CBGU0M&ab_channel=JeremyEthier</Typography>
                <Typography>https://www.youtube.com/watch?v=mUns8O4YL5M&ab_channel=JoannaSohOfficial</Typography>
                <Typography>https://www.youtube.com/watch?v=WIHy-ZnSndA&ab_channel=HASfit</Typography>
                <Typography>https://www.youtube.com/watch?v=U9W6cU-c56c&ab_channel=TomMerrick</Typography>
            </Fragment>
        )
    ]
};

// prevent alterations to this object from external sources
Object.freeze(workoutDetails);

export default workoutDetails;