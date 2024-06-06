import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useMyContextProvider } from "../src/index";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ScrollView } from "react-native-gesture-handler";

const ChangePass = () => {
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [disable, setDisable] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    const reauthenticate = (currentPassword) => {
        const user = auth().currentUser;
        const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !passwordConfirm) {
            alert('Please fill out all fields');
            return;
        }

        if (newPassword !== passwordConfirm) {
            alert('New password and confirm password do not match');
            return;
        }

        try {
            await reauthenticate(currentPassword);
            const user = auth().currentUser;
            await user.updatePassword(newPassword);

            await firestore()
                .collection('USERS')
                .doc(userLogin.email)
                .update({
                    password: newPassword
                });
            alert('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setPasswordConfirm('');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing password. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.headerText}>Change Your Password</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Current Password: </Text>
                        <TextInput
                            style={[styles.input, styles.rightAlign]}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>New Password: </Text>
                        <TextInput
                            style={[styles.input, styles.rightAlign]}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Confirm Password: </Text>
                        <TextInput
                            style={[styles.input, styles.rightAlign]}
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center'
    },
    headerText: {
        padding: 15,
        fontSize: 35,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderWidth: 0.5
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        alignSelf: 'center'
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        fontSize: 20,
        textAlign: 'right',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#84BFF3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        textAlign: 'center',
        borderWidth: 0.5
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default ChangePass;
