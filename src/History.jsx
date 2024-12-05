import React, {useState} from 'react';
import {
    Heading,
    Flex,
    Text,
    Divider,
    Button,
  } from "@aws-amplify/ui-react";
import {LogVitals} from './LogVitals'; // has form data

export function History(){ 
    const [vitalsHistory, setVitalsHistory] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleVitalsSubmit = (vitals) => {
        console.log("Vitals Form Received into History", vitals);
        setVitalsHistory([...vitalsHistory, vitals]);
        setIsSubmitted(true);
    };

    console.log("isSubmitted:", isSubmitted); // debugging log
    console.log("vitalsHistory:", vitalsHistory); // debug log

    const handleClear = () => {
        setVitalsHistory([]);   // clear history
        setIsSubmitted(false); // reset submission state
    }

    return (
        <Flex
            className="History"
            justifyContent="center"
            alignItems="center"
            direction="column"
            //width="70%"
            margin="0 auto">

            <Heading level={1}>History</Heading>
            <Divider />
            
            {!isSubmitted && (<Text>(EMPTY) Please log a Vitals Form for results.</Text>)}

            {isSubmitted && (
                <div>
                <Heading level={6}>Vitals Data</Heading>
                <ul>
                {vitalsHistory.map((vitals, index) => (
                    <li key={index}>
                        <li>Age: {vitals.age}</li>
                        <li>Weight: {vitals.weight}</li>
                        <li>Heart Rate: {vitals.heartRate}</li>
                        <li>Systolic BP: {vitals.systolicBP}</li>
                        <li>Diastolic BP: {vitals.diastolicBP}</li>
                    </li>
                ))}
                </ul>
                <Button onClick={handleClear}>Clear</Button>
                </div>
            )}
        </Flex>
    );
}

export default History;