// PATIENT DASHBOARD (home APP screen)
import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
// ABOVE code added through AWS

import * as React from 'react';

// Imports for .jsx files
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LogVitals from "./LogVitals";
import History from "./History";
import Profile from "./Profile";
import Navigation from "./Navigation";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [userprofiles, setUserProfiles] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    setUserProfiles(profiles);
  }

  return (
    <BrowserRouter>
    <Flex
      className="App"
      //justifyContent="center"
      //alignItems="center"
      //direction="column"
      //width="70%"
      //margin="0 auto"
    >
      
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="logVitals" element={<LogVitals />}/>
        <Route path="history" element={<History />}/>
        <Route path="profile" element={<Profile />}/>
      </Route>
    </Routes>

    </Flex>
    </BrowserRouter>
  );
}