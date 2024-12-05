// HOME Screen
import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Heading,
  Flex,
  Grid,
  Divider,
  Text,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
// ABOVE code added through AWS

import * as React from 'react';
import { colors } from "@mui/material";
import { teal } from "@mui/material/colors";
import { CpuArch } from "aws-cdk-lib/aws-eks";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function Home() {
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
    <Flex
      className="Home"
      justifyContent="center"
      alignItems="center"
      direction="column"
      //width="70%"
      margin="0 auto"
    >
      <Heading level={1}>Home</Heading>

      <Divider />

      <Grid
        margin="3rem 0"
        autoFlow="column"
        justifyContent="center"
        gap="2rem"
        alignContent="center"
      >
        {userprofiles.map((userprofile) => (
          <Flex
            key={userprofile.id || userprofile.email}
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            border="1px solid #ccc"
            padding="2rem"
            borderRadius="5%"
            className="box"
          >
            <Card>
              <Heading>Getting Started</Heading>
              <Text>Thanks for creating an account using {userprofile.email} with us in Homeostizer. Start by adding your personal information in the My Profile page. Then, add your vitals on Log Vitals. Your results of the log will be located in the History page.</Text>
            </Card>
          </Flex>
        ))}
      </Grid>
      <Button onClick={signOut}>Sign Out</Button>

    </Flex>
  );
}