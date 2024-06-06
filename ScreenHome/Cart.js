import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Cart = ({ route, navigation }) => {
    const { service } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    const handlePlaceOrder = async () => {
        try {
            await firestore().collection('Cart').add({
                serviceId: service.id,
                title: service.title,
                price: service.price,
                quantity: quantity,
                notes: notes,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            alert('Order placed successfully!');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            alert('Failed to place order. Please try again.');
        }
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    {service.image !== "" && (
                        <Image
                            source={{ uri: service.image }}
                            style={styles.serviceImage}
                            resizeMode="contain"
                        />
                    )}
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.servicePrice}>{parseInt(service.price).toLocaleString('vi-VN')} ₫</Text>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                     <TextInput
                        mode='outlined'
                        cursorColor='pink'
                        theme={{
                        colors: {
                            primary: '#4858AD', // Màu viền khi được chọn
                            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
                        },
                        }}
                        label={"Note"}
                        value={notes}
                        multiline
                        numberOfLines={2}
                        onChangeText={text => setNotes(text)}
                        style={styles.input}
                    />
                    <Button 
                        mode='elevated'
                        labelStyle={styles.label}
                        onPress={handlePlaceOrder}
                        style={styles.button}>
                        Place Order
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    serviceImage: {
        height: 200,
        width: '100%',
    },
    serviceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    servicePrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantityButton: {
        backgroundColor: '#4858AD',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    quantityText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    input: {
        marginVertical: 10,
        marginHorizontal:10,
        backgroundColor: 'white',
        height:70
    },
    orderButton: {
        marginTop: 20,
        marginHorizontal:10,
        backgroundColor: 'blue',
    },
    label:{
        fontSize:20,
        color:'blue'
    },
    button:{
        borderRadius:10,
        padding:5,
        margin:5,
        borderWidth: 0.5,
        borderColor: 'blue', 
        marginTop:20,
        backgroundColor:'#84BFF3'
    },
});

export default Cart;
