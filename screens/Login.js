import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useMyContextProvider, login } from '../src/index';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('T@gmail.com');
  const [password, setPassword] = useState('123456');
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);
  const imageSource = showPassword ? require('../assets/eye-hidden.png') : require('../assets/eye.png');

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    setDisableLogin(email.trim() === '' || password.trim() === '' || hasErrorEmail() || hasErrorPassword());
  }, [email, password, hasErrorEmail, hasErrorPassword]);

  const handleLogin = () => {
    login(dispatch, email, password);
  };

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin")
        navigation.navigate("Admin")
      else if (userLogin.role === "customer")
        navigation.navigate("Customer")
    }
  }, [userLogin])

  return (
    <View style={{ flex: 1,padding:25}}>
      <ScrollView>
      <Image source={require("../assets/logogo.png")}
          style={{
              alignSelf: "center",
              marginBottom:20,
              height:300,
              width:300
          }}
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
        label={"Email"}
        placeholder='Nhập Email'
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={email.length > 0 && hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <View>
        <TextInput
          mode='outlined'
          theme={{
            colors: {
              primary: '#4858AD', // Màu viền khi được chọn
              underlineColor: 'transparent', // Màu gạch chân khi không được chọn
            },
          }}
          cursorColor='pink'
          label={"Password"}
          placeholder='Nhập Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: 18, right: 18 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={imageSource}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <HelperText type='error' visible={password.length > 0 && hasErrorPassword()}>
        Password có ít nhất 6 ký tự
      </HelperText>
      <Button 
        mode='contained'
        labelStyle={styles.label}
        onPress={handleLogin}
        style={styles.button}>
            Login
        </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:15}}>Dont have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text}>
           Create new account
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={{color:'#4858AD',fontSize:15}}>
          Forgot Password
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
    color:'#4858AD',
    marginVertical:10,
    fontSize:15,

  },
  label:{
      fontSize:20
  },
  label2:{
      fontSize:20,
      color:'blue'
  }
})

export default Login;
