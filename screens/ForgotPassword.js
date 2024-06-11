import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [disableGetPassword, setDisableGetPassword] = useState(true);

  const hasErrorEmail = () => !email.includes('@');

  const handleGetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage('A password reset email has been sent to your email address.');
        setError('');
      })
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
        setError('An error occurred. Please try again later.');
        setSuccessMessage('');
      });
  };

  useEffect(() => {
    setDisableGetPassword(email.trim() === '' || !!error || hasErrorEmail());
  }, [email, error, hasErrorEmail]);

  return (
    <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
      <Text style={styles.title}>
        Forgot Password
      </Text>
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#4858AD', // Border color when focused
            underlineColor: 'transparent', // Underline color when not focused
          },
        }}
        label="Email"
        placeholder='Enter your Email'
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={email.length > 0 && hasErrorEmail()}>
        Invalid Email Address
      </HelperText>
      {error ? (
        <HelperText type='error'>
          {error}
        </HelperText>
      ) : null}
      {successMessage ? (
        <HelperText type='info'>
          {successMessage}
        </HelperText>
      ) : null}
      <Button 
        mode='contained'
        labelStyle={styles.label}
        onPress={handleGetPassword}
        style={styles.button}
        disabled={disableGetPassword}
      >
        Get Password
      </Button>
      <View style={styles.loginRedirect}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#4858AD',
    marginBottom: 50,
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'blue',
    padding: 5,
    margin: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  loginRedirect: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginText: {
    color: '#4858AD',
    fontSize: 20,
  },
  label: {
    fontSize: 20,
  },
});

export default ForgotPassword;
