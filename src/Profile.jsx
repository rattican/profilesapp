import React from 'react';
import {
    Button,
    Heading,
    Flex,
    View,
    Grid,
    Divider,
    Text,
    Input,
    Radio,
    RadioGroupField,
} from "@aws-amplify/ui-react"

import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { deleteUser } from 'aws-amplify/auth';

// Library for Material UI Icon
import EditIcon from '@mui/icons-material/Edit';

// Library for Phone Number submission format
import { PhoneNumberField } from '@aws-amplify/ui-react';
import { Tab } from '@mui/material';
// Function to display phoneNum field with default area code as +1
export const DefaultPhoneNumberFieldExample = () => (
  <PhoneNumberField label="Phone Number" defaultDialCode="+1" />
);

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

// Form component (for users to edit their own details)
const EditUserProfileForm = ({ userprofile, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...userprofile });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Text>
                First Name: <Input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                />
            </Text>
            <Text>
                Last Name: <Input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                />
            </Text>
            <Text>
                Date of Birth: <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    //isRequired
                />
            </Text>
            <Text>
            <RadioGroupField
                legend="Sex"
                name="sex"
                //isRequired
                onChange={handleChange}
                value = {formData.sex}
                >
                <Radio value='M'>Male</Radio>
                <Radio value='F'>Female</Radio>
            </RadioGroupField>
            </Text>
            <Text>
                Address: <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </Text>
            
            <Text>
                <PhoneNumberField
                    autoComplete='phone'
                    defaultDialCode="+1"
                    label="Phone Number:"
                    placeholder="123-456-6789"
                    variation='quiet'
                    />
            </Text>
            <br/>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={onCancel}>Cancel</Button>
        </form>
    );
}; // end of component    

// profile component
export function Profile(){
    const [userprofiles, setUserProfiles] = useState([]);
    const { signOut } = useAuthenticator((context) => [context.user]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserProfile, setSelectedUserProfile] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    async function fetchUserProfile() {
        const { data: profiles } = await client.models.UserProfile.list();
        setUserProfiles(profiles);
    }

    const handleEdit = (userprofile) => {
        // Function to handle editing user details
        setSelectedUserProfile(userprofile);
        setIsEditing(true);
    };

    const handleSave = /*async*/ (updatedProfile) => {
        //try {
            // Callling API to update database
            /*await*/ client.models.UserProfile.update(updatedProfile.id, updatedProfile);
            
            // Update user profiles with new data
            setUserProfiles((prevProfiles) =>
                prevProfiles.map((profile) =>
                    profile.id === updatedProfile.id ? updatedProfile : profile
            ));

            // Reset editing ability and confirm details have been updated in console
            console.log("Updated Profile: ", updatedProfile);
            setIsEditing(false);
            setSelectedUserProfile(null);
        //} catch(error){
        //    console.error("ERROR in Profile Update: ", error)
        //}
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedUserProfile(null);
    };

    return(
        <Flex
            className="Profile"
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="70%"
            margin="0 auto">
            <Heading level={1}>My Profile</Heading>
            <Divider />
            {isEditing && selectedUserProfile ? (
                <EditUserProfileForm
                    userprofile={selectedUserProfile}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ):(
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
                    <View>
                    <Heading level="3">{userprofile.email}</Heading>
                    </View>
                    <Button onClick={() => handleEdit(userprofile)}><EditIcon/></Button>
                    <Text>
                        Patient ID: {userprofile.id}<br/>
                        Full Name: {userprofile.fname} {userprofile.lname}<br/>
                        Date of birth: {userprofile.dob}<br/>
                        Sex: {userprofile.sex}<br/>

                        Address: {userprofile.address}<br/>
                        Email address: {userprofile.email}<br/>
                        Phone number: {userprofile.phone}<br/>
                    </Text>
                    <Button onClick={deleteUser}>Delete User</Button>
                </Flex>
                ))}
            </Grid>
            )}
            <Button onClick={signOut}>Sign Out</Button>
        </Flex>
    )
}

export default Profile;