import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMyContextProvider } from "../src/index";

const Checkout = ({ navigation }) => {
    const [carts, setCarts] = useState([]);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [onlinePaymentSelected, setOnlinePaymentSelected] = useState(false);
    const [cashPaymentSelected, setCashPaymentSelected] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);


    const handleOnlinePayment = () => {
        setOnlinePaymentSelected(!onlinePaymentSelected);
        if (cashPaymentSelected) {
            setCashPaymentSelected(false);
        }
    };

    const handleCashPayment = () => {
        setCashPaymentSelected(!cashPaymentSelected);
        if (onlinePaymentSelected) {
            setOnlinePaymentSelected(false);
        }
    };

    const handleDelete = (cartId) => {
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this service?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        firestore()
                            .collection('Cart')
                            .doc(cartId)
                            .delete()
                            .then(() => {
                                console.log("Dịch vụ đã được xóa thành công!");
                            })
                            .catch(error => {
                                console.error("Lỗi khi xóa dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        );
    };

    const handleCheckout = async () => {
        if (!onlinePaymentSelected && !cashPaymentSelected) {
            Alert.alert(
                "Warning",
                "You need to choose a Payment method",
                [
                    { text: "Cancel" },
                    { text: "Accept" }
                ]
            );
            return;
        }

        const cartOrderData = {
            carts: carts,
            totalAmount: totalAmount,
            paymentMethod: cashPaymentSelected ? 'Cash' : 'Online',
            userId: userLogin.email,
            timestamp: firestore.FieldValue.serverTimestamp(),
        };

        try {
            const cartOrderRef = await firestore().collection('CartOrders').add(cartOrderData);

            // Clear the cart collection after checkout
            const cartDocs = await firestore().collection('Cart').get();
            const deletePromises = cartDocs.docs.map(doc => doc.ref.delete());
            await Promise.all(deletePromises);

            // Navigate to CashPayment screen with the cart order data
            if (cashPaymentSelected) {
                navigation.navigate('CashPayment', { cartOrderId: cartOrderRef.id });
            } else {
                // Handle online payment navigation here
            }
        } catch (error) {
            console.error("Error during checkout: ", error);
            Alert.alert("Error", "Something went wrong during checkout. Please try again.");
        }
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Cart')
            .onSnapshot(async querySnapshot => {
                const carts = [];
                let total = 0;

                const promises = querySnapshot.docs.map(async documentSnapshot => {
                    const cartItem = {
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    };

                    const serviceSnapshot = await firestore()
                        .collection('Services')
                        .doc(cartItem.serviceId)
                        .get();

                    if (serviceSnapshot.exists) {
                        cartItem.image = serviceSnapshot.data().image;
                    }

                    total += cartItem.price * cartItem.quantity;
                    carts.push(cartItem);
                });

                await Promise.all(promises);
                setCarts(carts);
                setTotalAmount(total);
            });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shopping Cart List</Text>
            <FlatList
                data={carts}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        {item.image !== "" && (
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        )}
                        <View style={styles.productInfo}>
                            <Text style={styles.cartItemText}>Name : {item.title}</Text>
                            <Text style={styles.cartItemText}>Price: {parseInt(item.price).toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.cartItemText}>Quantity : {item.quantity}</Text>
                            <Text style={styles.cartItemText}>ToTal : {(parseInt(item.price) * item.quantity).toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.cartItemText}>Note: {item.notes}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.deleteButton} 
                            onPress={() => handleDelete(item.id)}
                        >
                            <Icon name="close" size={24} color="#ff0000" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.paymentOptionsContainer}>
                <TouchableOpacity
                    style={[styles.optionButton, onlinePaymentSelected && styles.selectedOptionButton]}
                    onPress={handleOnlinePayment}>
                    <Text style={[styles.optionButtonText, onlinePaymentSelected && styles.selectedOptionButtonText]}>Pay Online</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionButton, cashPaymentSelected && styles.selectedOptionButton]}
                    onPress={handleCashPayment}>
                    <Text style={[styles.optionButtonText, cashPaymentSelected && styles.selectedOptionButtonText]}>Cash Payment</Text>
                </TouchableOpacity>
            </View>
            {userLogin !== null && (
                <View>
                <Text style={styles.label}>Full Name: {userLogin.fullName} </Text>
                <Text style={styles.label}>Address: {userLogin.address} </Text>
                <Text style={styles.label}>Phone: {userLogin.phone}</Text>
                </View>
            )}
            <Text style={styles.totalAmount}>Total Amount: {parseInt(totalAmount).toLocaleString('vi-VN')} ₫</Text>
            <Button title="PAY" onPress={handleCheckout} disabled={!userLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#D7F5F9',
        borderRadius: 5,
        position: 'relative',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    cartItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    selectedOptionButton: {
        backgroundColor: '#B3BCEC',
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    totalAmount: {
        fontSize: 20,
    },
    label: {
        fontSize: 15,
    },
});

export default Checkout;
