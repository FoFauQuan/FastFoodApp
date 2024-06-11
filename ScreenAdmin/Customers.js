import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from "react-native-gesture-handler";

const Customers = ({navigation}) => {
    const [customers, setCustomers] = useState([]);
    const [admin,setAdmins]=useState([])

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('USERS')
            .where('role', '==', 'customer')
            .onSnapshot(querySnapshot => {
                const customersData = [];
                querySnapshot.forEach(documentSnapshot => {
                    customersData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setCustomers(customersData);
            });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('USERS')
            .where('role', '==', 'admin')
            .onSnapshot(querySnapshot => {
                const adminData = [];
                querySnapshot.forEach(documentSnapshot => {
                    adminData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setAdmins(adminData);
            });

        return () => unsubscribe();
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>handleCustomer(item)}>
        <View style={styles.card}>
            <Text style={styles.cardText}>Email: {item.email} </Text>
            <Text style={styles.cardText}>Tên: {item.fullName} </Text>
            <Text style={styles.cardText}>Địa chỉ: {item.address} </Text>
            <Text style={styles.cardText}>SDT: {item.phone} </Text>
        </View>
        </TouchableOpacity>
    );
    // const renderItemadmin = ({ item }) => (
    //     <TouchableOpacity onPress={()=>handleCustomer(item)}>
    //     <View style={{ margin: 10, 
    //         padding: 15, 
    //         borderRadius: 15, 
    //         marginVertical: 5, 
    //         backgroundColor:'#84BFF3'
    //         }}>
    //         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email: {item.email} </Text>
    //         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tên: {item.fullName} </Text>
    //         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Địa chỉ: {item.address} </Text>
    //         <Text style={{ fontSize: 18, fontWeight: "bold" }}>SDT: {item.phone} </Text>
    //     </View>
    //     </TouchableOpacity>
    // );
    const handleCustomer = (users) => {
        navigation.navigate("Profile", { users });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin</Text>
            <FlatList
                data={admin}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
            <Text style={styles.header}>Customers</Text>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000000',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderWidth:0.5,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00000',
        marginBottom: 5,
    },
});
export default Customers;
