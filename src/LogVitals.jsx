import React, { useState } from 'react';
import {
    Heading,
    Flex,
    Divider,
    Text,
    View,
    Button,
    RadioGroupField,
    Radio,
    StepperField,
    SliderField,
} from "@aws-amplify/ui-react"

export function LogVitals({ onSubmit }){
    // store vital info submissions here
    const [age, setAge] = useState(18);
    const [weight, setWeight] = useState(50);
    const [heartRate, setHeartRate] = useState(50);
    const [systolicBP, setSystolicBP] = useState("90");
    const [diastolicBP, setDiastolicBP] = useState("60");

    // handle submissions
    const handleSubmit = () => {
        const vitals = {
            age,
            weight,
            heartRate,
            systolicBP,
            diastolicBP,
        };
        console.log("Submitting vitals:", vitals);
        onSubmit(vitals);
    };

    return(
        <Flex
            className="LogVitals"
            justifyContent="center"
            alignItems="center"
            direction="column"
            //width="70%"
            margin="0 auto">

            <Heading level={1}>Log Vitals</Heading>
            <Divider />
            <View>
            <Text>Age (yrs)
                <StepperField
                    max={80}
                    min={18}
                    step={1}
                    size="small"
                    label="Max 80"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}/>
            </Text>

            <Text>Weight (lbs)
                <StepperField
                    max={1000}
                    min={50}
                    step={0.5}
                    size="small"
                    label="Round to the nearest 0.5 or full number"
                    //labelHidden='true'
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}/>
            </Text>

            <Text>Heart Rate (BPM)
                <SliderField
                    label="Beats Per Minute"
                    min={50}
                    max={200}
                    size="small"
                    value={heartRate}
                    onChange={(e) => setHeartRate(parseInt(e.target.value))}/>
            </Text>

            <Text>Blood Pressure Values (mmHg)
                <RadioGroupField
                legend="Systolic B.P."
                name="systolic"
                variation="outlined"
                size="small"
                value={systolicBP}
                onChange={(e) => setSystolicBP(e.target.value)}>
                    <Radio value="90">40-90</Radio>
                    <Radio value="120">90-120</Radio>
                    <Radio value="140">120-140</Radio>
                    <Radio value="160">140-160</Radio>
                    <Radio value="180">160-180+</Radio>
                </RadioGroupField>

                <RadioGroupField
                legend="Diastolic B.P."
                name="diastolic"
                variation="outlined"
                size="small"
                value={diastolicBP}
                onChange={(e) => setDiastolicBP(e.target.value)}>
                    <Radio value="60">40-60</Radio>
                    <Radio value="80">60-80</Radio>
                    <Radio value="90">80-90</Radio>
                    <Radio value="100">90-100</Radio>
                    <Radio value="120">100-120+</Radio>
                </RadioGroupField>
            </Text>
            <Button onClick={handleSubmit}>Submit</Button>
            </View>
        </Flex>
    )
}

export default LogVitals;