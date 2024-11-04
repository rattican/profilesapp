import React from 'react';
import {
    Heading,
    Flex,
    Divider,
} from "@aws-amplify/ui-react"

export function LogVitals(){
    return(
        <Flex
            className="LogVitals"
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="70%"
            margin="0 auto">
            <Heading level={1}>Log Vitals</Heading>
            <Divider />
        </Flex>
    )
}

export default LogVitals;