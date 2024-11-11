import React from 'react';
import {
    Heading,
    Flex,
    Divider,
    Text,
    View,
    Button,
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
            <View>
            <Text>Enter Heart Rate:</Text>
            <Text>Enter Blood Pressure:</Text>
            <Button>Temp Button</Button>
            </View>
        </Flex>
    )
}

export default LogVitals;