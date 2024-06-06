import React, { useState, useEffect,Alert } from 'react';
import { Image, View,StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../src/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);
  const imageSource = showPassword ? require('../assets/eye-hidden.png') : require('../assets/eye.png');
  const imageSourceConfirm = showConfirmPassword ? require('../assets/eye-hidden.png') : require('../assets/eye.png');


  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email, password, confirmPassword, phone, address, hasErrorFullName, hasErrorEmail, hasErrorPassword, hasErrorPasswordConfirm]);

  const handleRegister = async () => {
    const role = "customer";

    try {
      const createdUser = await createAccount(email, password, fullName, phone, address, role);

      navigation.navigate("Login"); // Redirect to Login screen
    } catch (error) {
      Alert.alert("Error", "An error occurred: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20,justifyContent:'center' }}>
      <ScrollView>


      <Text style={{
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#4858AD",
        marginVertical:5
      }}> Register  </Text>
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Full Name"}
        value={fullName}
        onChangeText={setFullname}
      />
      <HelperText type='error' visible={ hasErrorFullName()}>
        Full name không được phép để trống
      </HelperText>
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={ email.length > 0 &&hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
        <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon 
            icon ={showPassword? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      <HelperText type='error' visible={ password.length > 0 &&hasErrorPassword()}>
        Password ít nhất 6 kí tự
      </HelperText>
        <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
          label={"Confirm Password"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon 
            icon ={showConfirmPassword? "eye-off" : "eye"}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
      <HelperText type='error' visible={ confirmPassword.length > 0 &&hasErrorPasswordConfirm()}>
        Confirm Password phải giống với Password
      </HelperText>
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Address"}
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Phone"}
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 20 }}
      />
      <Button 
        mode='contained'
        labelStyle={styles.label}
        onPress={handleRegister}
        style={styles.button}>
            Create New Account
        </Button>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:15}}>Do you have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color:'#192979',marginVertical:10,fontSize:15}}>
          Login Account
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
  );
};
const styles = StyleSheet.create({
  button:{
      borderRadius:5,
      backgroundColor:'blue',
      padding:5,
      margin:5,
      marginBottom:10,
      borderWidth: 0.5,
      borderColor: 'white'
  },
  button2:{
      borderRadius:5,
      padding:5,
      margin:5,
      borderWidth: 0.5,
      borderColor: 'blue', 
  },
  text:{
      margin:5,
      marginVertical:10,
      textAlign:'center',
      fontFamily:'bold',
      fontSize:28
  },
  label:{
      fontSize:20
  },
  label2:{
      fontSize:20,
      color:'blue'
  }
})

export default Register;
