import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Customers from "../ScreenAdmin/Customers";
import ProfileAdmin from "../ScreenAdmin/ProfileAdmin";

const Stack = createStackNavigator();


const ProfileNavi = ({ navigation }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerLeft: null, headerShown: false}} name="Customers" component={Customers} />
            <Stack.Screen name="Profile" component={ProfileAdmin} />
        </Stack.Navigator>
    )
}

export default ProfileNavi;
