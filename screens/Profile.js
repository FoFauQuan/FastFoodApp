import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity, TextInput  } from "react-native";
import { useMyContextProvider } from "../src/index";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = () =>{
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [disable, setDisable] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const hasErrorPhone = () => phone.length != 10;
    useEffect(() => {
        if (userLogin) {
            setAddress(userLogin.address);
            setFullName(userLogin.fullName);
            setPhone(userLogin.phone);
        } else {
            // Đặt lại giá trị state khi userLogin là null (khi đăng xuất)
            setAddress('');
            setFullName('');
            setPhone('');
        }
    }, [userLogin]);

    useEffect(() => {
        setDisable(address.trim() === '' ||
        fullName.trim() === '' ||
        phone.trim() === null||
        hasErrorPhone());
      }, [ fullName,address,phone,hasErrorPhone]);

    const handleUpdate = async () => {
        if (!userLogin) {
            alert('User is not logged in!');
            return;
        }
        try {
            await firestore()
                .collection('USERS')
                .doc(userLogin.email)
                .update({
                    fullName:fullName,
                    address:address,
                    phone:phone
                });
            dispatch({
                type: 'UPDATE_USER_LOGIN',
                payload: {
                    fullName: fullName,
                    address: address,
                    phone: phone,
                },
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Lỗi khi cập nhật profile:", error);
        }
    }
    const reauthenticate = (currentPassword) => {
        const user = auth().currentUser;
        const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    };
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            alert('Please fill out all fields');
            return;
        }

        try {
            await reauthenticate(currentPassword);
            const user = auth().currentUser;
            await user.updatePassword(newPassword);
            // Cập nhật mật khẩu trong Firestore
            await firestore()
            .collection('USERS')
            .doc(userLogin.email)
            .update({
                password: newPassword
            });
            alert('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing password. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
        <View style={{backgroundColor:'#FAE7FD',flex:1}}>
        <Text style={styles.headerText}>Profile Screen</Text>
        {userLogin !== null && (
            <>  
                <View style={{borderWidth:1}}>
                <View style={styles.row}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.value}>{userLogin.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name: </Text>
                    <TextInput
                        style={styles.input}
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address: </Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone: </Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled ={disable}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

            </>
        )}
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
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignContent:'center',
    justifyContent:'center'
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
    borderWidth:0.5
},
label: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    alignSelf:'center'
},
value: {
    fontSize: 20,
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
    textAlign:'center',
    borderWidth:0.5
},
buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center'
},
});
export default Profile
;
