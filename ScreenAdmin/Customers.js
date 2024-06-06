import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
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
        <View style={{ margin: 10, 
            padding: 15, 
            borderRadius: 15, 
            marginVertical: 5, 
            backgroundColor:'#84BFF3'
            }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email: {item.email} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tên: {item.fullName} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Địa chỉ: {item.address} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>SDT: {item.phone} </Text>
        </View>
        </TouchableOpacity>
    );
    const renderItemadmin = ({ item }) => (
        <TouchableOpacity onPress={()=>handleCustomer(item)}>
        <View style={{ margin: 10, 
            padding: 15, 
            borderRadius: 15, 
            marginVertical: 5, 
            backgroundColor:'#84BFF3'
            }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email: {item.email} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tên: {item.fullName} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Địa chỉ: {item.address} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>SDT: {item.phone} </Text>
        </View>
        </TouchableOpacity>
    );
    const handleCustomer = (users) => {
        navigation.navigate("Profile", { users });
    }

    return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold" }}>Admin</Text>
            <FlatList
                data={admin}
                renderItem={renderItemadmin}
                keyExtractor={item => item.id}
            />
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold" }}>Customers</Text>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Customers;
