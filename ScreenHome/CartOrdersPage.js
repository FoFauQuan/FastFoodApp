import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextProvider } from "../src/index";


const CartOrdersPage = ({navigation}) => {
    const [cartOrders, setCartOrders] = useState([]);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('CartOrders')
            .where('userId', '==', userLogin.email)
            .orderBy('timestamp', 'desc') // Order by timestamp in descending order
            .onSnapshot(querySnapshot => {
                if (querySnapshot) { // Check for null before accessing data
                    const orders = [];
                querySnapshot.forEach(doc => {
                    orders.push({ 
                    ...doc.data(),
                    id: doc.id });
                });
                setCartOrders(orders);
                }
            });

        return () => unsubscribe();
    }, []); // Re-run effect when userId changes

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your orders</Text>
            {cartOrders.length === 0 ? (
                <Text style={styles.emptyMessage}>There are no orders.</Text>
            ) : (
                <FlatList
                    data={cartOrders}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.orderId}>ID: {item.id}</Text>
                            <Text style={styles.orderInfo}>Total Amount: {parseInt(item.totalAmount).toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.orderInfo}>Payment Method: {item.paymentMethod}</Text>
                            <Text style={styles.orderInfo}>Time Order: {item.timestamp && item.timestamp.toDate().toLocaleString()}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
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
    emptyMessage: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 16,
    },
    orderItem: {
        marginBottom: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderInfo: {
        fontSize: 16,
        marginTop: 8,
    },
});

export default CartOrdersPage;
