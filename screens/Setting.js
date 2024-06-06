import { View, TouchableOpacity, Text,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { logout, useMyContextProvider } from "../src/index";
import { useEffect } from "react";

const Setting = ({ navigation }) => {
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    const handleLogout = () => {
        logout(dispatch);
        navigation.navigate("Login")
    };

    return (
        <View style={styles.container}>
            <Text
                style={styles.textheader}>
                Account and Setting ✨
            </Text>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("ProfileCustomer")} 
            style={styles.box1}>
                <Text style={styles.textbox1}>
                    Your Information
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <Text style={styles.textbox}>
                    Track The Order 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("ChangePass")} 
            style={styles.box}>
                <Text style={styles.textbox}>
                    Change Password
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <Text style={styles.textbox}>
                    Connect With Us
                </Text>
            </TouchableOpacity>
            <Button 
            mode='elevated'
            labelStyle={styles.label}
            onPress={handleLogout}
            style={styles.button}>
                Logout
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:5,
        paddingTop:50,
    },
    textheader:{
        alignSelf: 'center',
        fontSize: 30,
        paddingBottom:20,
    },
    label:{
        fontSize:20,
        color:'blue'
    },
    button:{
        borderRadius:10,
        padding:5,
        borderWidth: 0.5,
        borderColor: 'blue', 
        marginTop:20
    },
    box:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
        backgroundColor: 'white',
        borderRadius:2
    },
    box1:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
        backgroundColor: '#84BFF3',
        borderRadius:2
    },
    textbox:{
        fontSize:18,
        padding:10,
    },
    textbox1:{
        fontSize:20,
        padding:10,
        paddingVertical:18,
        fontWeight: 'bold'
    }
});
export default Setting;