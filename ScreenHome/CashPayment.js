import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextProvider } from "../src/index";

const CashPayment = ({ route,navigation }) => {
    const { cartOrderId } = route.params;
    const [orderDetails, setOrderDetails] = useState(null);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const orderSnapshot = await firestore()
                .collection('CartOrders')
                .doc(cartOrderId)
                .get();

            if (orderSnapshot.exists) {
                setOrderDetails(orderSnapshot.data());
            }
        };

        fetchOrderDetails();
    }, [cartOrderId]);

    if (!orderDetails) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            {userLogin !== null && (
            <Text style={styles.label}>Full Name: {userLogin.fullName} </Text>
            )}
            <Text style={styles.label}>Phone: {orderDetails.phone}</Text>
            <Text style={styles.label}>Address: {orderDetails.address} </Text>
            <Text style={styles.label}>Time Order: {orderDetails.timestamp && orderDetails.timestamp.toDate().toLocaleString()} </Text>
            <Text style={styles.subtitle}>Payment methods: {orderDetails.paymentMethod}</Text>
            <FlatList
                data={orderDetails.carts}
                ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Title</Text>
                        <Text style={styles.tableHeaderText}>Price</Text>
                        <Text style={styles.tableHeaderText}>Quantity</Text>
                        <Text style={styles.tableHeaderText}>Amont</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{item.title}</Text>
                        <Text style={styles.tableRowText}>{parseInt(item.price).toLocaleString('vi-VN')} ₫</Text>
                        <Text style={styles.tableRowText}>{item.quantity}</Text>
                        <Text style={styles.tableRowText}>{(parseInt(item.price) * item.quantity).toLocaleString('vi-VN')} ₫</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.totalAmount}>Total Amount: {parseInt(orderDetails.totalAmount).toLocaleString('vi-VN')} ₫</Text>
            <Button title="Back to Menu" onPress={() => navigation.navigate("ServicesCustomer")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },
    tableRowText: {
        flex: 1,
        fontSize: 16,
    },
    totalAmount: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CashPayment;
