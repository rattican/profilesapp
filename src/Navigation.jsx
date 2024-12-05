import React from 'react';
import {
    Button,
    Heading,
    Flex,
    View,
    Grid,
    Divider,
    Text,
    Card,
  } from "@aws-amplify/ui-react";

// Sign Out
import { useAuthenticator } from "@aws-amplify/ui-react";
// Navigation
import { BottomNavigation, BottomNavigationAction, colors, rgbToHex, } from "@mui/material";

// Icon(s):
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HomeIcon from '@mui/icons-material/Home';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HistoryIcon from '@mui/icons-material/History';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// Routes
import { Outlet, Link } from "react-router-dom";
import { blue, teal } from '@mui/material/colors';

export function Navigation(){ 
    const { signOut } = useAuthenticator((context) => [context.user]);

    const [value, setValue] = React.useState('recents');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Flex
            className="Navigation"
            justifyContent="center"
            alignItems="center"
            direction="column"
            //width="70%"
            margin="0 auto"
            >

            <Grid
                alignItems='center'
                position='fixed'
                top='large'
                templateColumns='20fr 1fr'
                >
          
                <Text color='teal'><HealthAndSafetyIcon/> Homeostizer</Text>
                <Button onClick={signOut}><LogoutRoundedIcon /></Button>
        
            </Grid>

            <Outlet />
            
            <BottomNavigation sx={{ width: 700, position: 'fixed', bottom: 0 }} value={value} onChange={(handleChange)}>
            <BottomNavigationAction
                to="/"
                LinkComponent={Link}
                label="Home"
                value="home"
                icon={<HomeIcon/>}
            />
            <BottomNavigationAction
                to="/logVitals"
                LinkComponent={Link}
                label="Log Vitals"
                value="log"
                icon={<MonitorHeartIcon/>}
            />
            <BottomNavigationAction
                to="/history"
                LinkComponent={Link}
                label="History"
                value="history"
                icon={<HistoryIcon/>}
            />
            <BottomNavigationAction
                to="/profile"
                LinkComponent={Link}
                label="Profile"
                value="profile"
                icon={<ManageAccountsIcon/>}
            />
            </BottomNavigation>
        </Flex>
    )
}

export default Navigation;