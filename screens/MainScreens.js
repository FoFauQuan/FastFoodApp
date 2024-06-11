import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const MainScreens = ({ navigation }) => {

    const handleGuestNavigation = async () => {
        try {
            let guestId = await AsyncStorage.getItem('guestId');
            if (!guestId) {
                guestId = uuidv4(); // Sử dụng uuidv4() để tạo UUID ngẫu nhiên
                await AsyncStorage.setItem('guestId', guestId);
            }
            navigation.navigate('GuestNavi');
        } catch (error) {
            console.error("Error handling guest navigation: ", error);
            // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi cho người dùng)
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Image source={require("../assets/logo.jpg")}
                style={{ flex: 3 }}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>
                    Login to enjoy the best service!
                </Text>
                <Button
                    mode='contained'
                    labelStyle={styles.label}
                    onPress={() => navigation.navigate("Login")}
                    style={styles.button}>
                    Login
                </Button>
                <Button
                    mode='elevated'
                    labelStyle={styles.label2}
                    onPress={handleGuestNavigation}
                    style={styles.button2}>
                    Continue as Guest
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        backgroundColor: 'blue',
        padding: 5,
        margin: 5,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: 'white'
    },
    button2: {
        borderRadius: 5,
        padding: 5,
        margin: 5,
        borderWidth: 0.5,
        borderColor: 'blue',
    },
    text: {
        margin: 5,
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'bold',
        fontSize: 28
    },
    label: {
        fontSize: 20
    },
    label2: {
        fontSize: 20,
        color: 'blue'
    }
});

export default MainScreens;
