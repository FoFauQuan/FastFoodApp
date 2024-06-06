import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity,StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disableGetPassword, setDisableGetPassword] = useState(true);

  const hasErrorEmail = () => !email.includes('@');

  const handleGetPassword = () => {
    firestore()
      .collection('USERS')
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setPassword(userData.password);
          setError('');
        } else {
          setPassword('');
          setError('Email không tồn tại trong hệ thống.');
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
        setPassword('');
        setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      });
  };
  useEffect(() => {
    setDisableGetPassword(email.trim() === '' || !!error || hasErrorEmail());
  }, [email, error, hasErrorEmail]);

  return (
    <View style={{ flex: 1, padding: 10,justifyContent:'center' }}>
      <Text style={{
        fontSize: 35,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#4858AD",
        marginBottom:50
      }}>
        Forgot Password
      </Text>
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
      {password ? (
        <View style={{flexDirection: "row"}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Password: </Text>
          <Text style={{fontSize: 18}}>{password}</Text>
        </View>
      ) : null}
      <Button 
        mode='contained'
        labelStyle={styles.label}
        onPress={handleGetPassword}
        style={styles.button}>
            Get Password
        </Button>
      <View style={{justifyContent: "center", alignItems: "center",marginVertical:10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color:'#4858AD',fontSize:20}}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
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
export default ForgotPassword;
