import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const Services = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    const toggleDropdown = (id) => {
      setExpandedId(expandedId === id ? null : id);
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Services')
            .onSnapshot(querySnapshot => {
                const services = [];
                querySnapshot.forEach(documentSnapshot => {
                    services.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setServices(services);
                setInitialServices(services);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View>
        <TouchableOpacity onPress={() => toggleDropdown(item.id)} style={{ margin: 10,padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#84BFF3'}}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{parseInt(item.price).toLocaleString('vi-VN')} ₫</Text>
            </View>
        </TouchableOpacity>
        {expandedId === item.id && (
            <View style={{flexDirection: "row",
                    height:30,
                    justifyContent:'center',
                    alignContent:'center',
                    marginHorizontal:10,
                    borderRadius:20
            }}>
            <TouchableOpacity style={{borderWidth:1,flex:1, borderRadius:20,alignSelf:'center',padding:5,backgroundColor:'#8EFCAC'}} onPress={() => handleUpdate(item)}>
                <Text style={{alignSelf:'center'}}> Update</Text>
            </TouchableOpacity >
            <TouchableOpacity style={{borderWidth:1,flex:1, borderRadius:20,alignSelf:'center',padding:5,backgroundColor:'#FAFA9F'}} onPress={() => handleDetail(item)}>
                <Text style={{alignSelf:'center'}}> Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:1,flex:1, borderRadius:20,alignSelf:'center',padding:5,backgroundColor:'#FCA5A5'}} onPress={() => handleDelete(item)}>
                <Text style={{alignSelf:'center'}}> Delete</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );

    

    const handleUpdate = async (service) => {
        try {
            navigation.navigate("ServiceUpdate", { service });
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
        }
    }
    

    const handleDelete = (service) => {
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this service? This operation cannot be returned",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        firestore()
                            .collection('Services')
                            .doc(service.id)
                            .delete()
                            .then(() => {
                                console.log("Dịch vụ đã được xóa thành công!");
                                navigation.navigate("Services");
                            })
                            .catch(error => {
                                console.error("Lỗi khi xóa dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        )
    }

    const handleDetail = (service) => {
        navigation.navigate("ServiceDetail", { service });
    }

    return (
        <View style={{ flex: 1, backgroundColor:'white' }}>
            <Image source={require("../assets/logogo.png")}
                style={{
                    alignSelf: "center",
                    height:150,
                    width:150
                }}
            />
            <TextInput
                label={"Search by name"}
                value={name}
                mode="null"
                cursorColor='pink'
                theme={{
                  colors: {
                    primary: '#84BFF3', // Màu viền khi được chọn
                    underlineColor: 'transparent', // Màu gạch chân khi không được chọn
                  },
                }}
                style={{
                    margin:10,
                    backgroundColor:'#D7F5F9'
                }}
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
            />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <Text style={{
                    padding: 15,
                    fontSize: 25,
                    fontWeight: "bold",
                }}>
                    Danh sách dịch vụ</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("AddNewService")}>
                      <Image source={require('../assets/add.png')} style={{ width: 30, height: 30, margin: 20 }} />
                    </TouchableOpacity>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Services;
