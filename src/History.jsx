import {
    Button,
    Heading,
    Flex,
    View,
    Grid,
    Divider,
  } from "@aws-amplify/ui-react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

export function History(){
    //

    //
    return (
        <Flex
            className="History"
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="70%"
            margin="0 auto">

            <Heading level={1}>History</Heading>
            <Divider />
            
            /* Insert COMPLETED BottomNavigation from App.jsx here */
        </Flex>
    )
}