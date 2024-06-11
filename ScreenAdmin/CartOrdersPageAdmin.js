import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextProvider } from "../src/index";

const CartOrdersPageAdmin = ({ navigation }) => {
    const [cartOrders, setCartOrders] = useState([]);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
            const unsubscribe = firestore()
                .collection('CartOrders')
                .orderBy('timestamp', 'desc')
                .onSnapshot(querySnapshot => {
                    if (querySnapshot) {
                        const orders = [];
                        querySnapshot.forEach(doc => {
                            orders.push({
                                ...doc.data(),
                                id: doc.id
                            });
                        });
                        setCartOrders(orders);
                    }
                });
    
            return () => unsubscribe();
    }, []); // Re-run effect when userId changes

    const handleOrderPress = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your orders</Text>
            {cartOrders.length === 0 ? (
                <Text style={styles.emptyMessage}>There are no orders.</Text>
            ) : (
                <FlatList
                    data={cartOrders}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.orderItem} onPress={() => handleOrderPress(item)}>
                            <Text style={styles.orderId}>ID: {item.id}</Text>
                            <Text style={styles.orderInfo}>Total Amount: {parseInt(item.totalAmount).toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.orderInfo}>Payment Method: {item.paymentMethod}</Text>
                            <Text style={styles.orderInfo}>Địa chỉ: {item.address}</Text>
                            <Text style={styles.orderInfo}>SĐT: {item.phone}</Text>
                            <Text style={styles.orderInfo}>Time Order: {item.timestamp && item.timestamp.toDate().toLocaleString()}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
            {selectedOrder && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Order Details</Text>
                            <Text style={styles.orderInfo}>ID: {selectedOrder.id}</Text>
                            <Text style={styles.orderInfo}>UserID: {selectedOrder.userId}</Text>
                            <Text style={styles.orderInfo}>Total Amount: {parseInt(selectedOrder.totalAmount).toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.orderInfo}>Payment Method: {selectedOrder.paymentMethod}</Text>
                            <Text style={styles.orderInfo}>Địa chỉ: {selectedOrder.address}</Text>
                            <Text style={styles.orderInfo}>SĐT: {selectedOrder.phone}</Text>
                            <Text style={styles.orderInfo}>Time Order: {selectedOrder.timestamp && selectedOrder.timestamp.toDate().toLocaleString()}</Text>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Title</Text>
                                <Text style={styles.tableHeaderText}>Price</Text>
                                <Text style={styles.tableHeaderText}>Quantity</Text>
                                <Text style={styles.tableHeaderText}>Amount</Text>
                            </View>

                            <FlatList
                                data={selectedOrder.carts} // Assuming "cart" is an array of objects with fields "title", "price", "quantity", "amount"
                                renderItem={({ item }) => (
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableRowText}>{item.title}</Text>
                                        <Text style={styles.tableRowText}>{parseInt(item.price).toLocaleString('vi-VN')} ₫</Text>
                                        <Text style={styles.tableRowText}>{item.quantity}</Text>
                                        <Text style={styles.tableRowText}>{(parseInt(item.price) * item.quantity).toLocaleString('vi-VN')} ₫</Text>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            <Button title="Close" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%', // Adjust as needed
        maxHeight: '80%', // Adjust as needed
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    tableRowText: {
        fontSize: 16,
    },
});

export default CartOrdersPageAdmin;
