import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const ServicesCustomer = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const unsubscribeServices = firestore()
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

        const unsubscribeCategories = firestore()
            .collection('CATEGORY')
            .onSnapshot(querySnapshot => {
                const categories = [];
                querySnapshot.forEach(documentSnapshot => {
                    categories.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setCategories(categories);
            });

        return () => {
            unsubscribeServices();
            unsubscribeCategories();
        };
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filteredServices = initialServices.filter(service => service.categoryId === selectedCategory.id);
            setServices(filteredServices);
        } else {
            setServices(initialServices);
        }
    }, [selectedCategory]);

    const [name, setName] = useState('');
    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };
    const handleAddToCart = (service) => {
        navigation.navigate("Cart", { service });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            {item.image !== "" && (
                <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    resizeMode="contain"
                />
            )}
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{parseInt(item.price).toLocaleString('vi-VN')} ₫</Text>
            <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(item)}>
                <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCategory = ({ item }) => (
        <TouchableOpacity 
            style={[styles.categoryButton, selectedCategory?.id === item.id && styles.selectedCategoryButton]} 
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={[styles.categoryButtonText, selectedCategory?.id === item.id && styles.selectedCategoryButtonText]}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Danh sách dịch vụ</Text>
            </View>
            <TextInput
                label={"Search by name"}
                value={name}
                mode="null"
                cursorColor='pink'
                theme={{
                    colors: {
                        primary: '#84BFF3',
                        underlineColor: 'transparent',
                    },
                }}
                style={{
                    margin:10,
                    backgroundColor: '#D7F5F9'
                }}
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
            />
            <View style={styles.categoryListContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryList}
                    contentContainerStyle={styles.categoryListContent}
                />
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 0.3,
        borderRadius: 5,
        marginHorizontal: 5,
        marginBottom: 5,
        maxWidth: '48%', // ensures two items per row
    },
    itemImage: {
        height: 150,
        width: 200,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'center',
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'center',
        textAlign: 'center',
    },
    cartButton: {
        backgroundColor: '#84BFF3',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    cartButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        padding: 15,
        fontSize: 25,
        fontWeight: "bold",
    },
    row: {
        justifyContent: 'space-between',
    },
    categoryListContainer: {
        marginVertical: 10,
    },
    categoryList: {
        paddingVertical: 10,
    },
    categoryListContent: {
        paddingHorizontal: 10,
    },
    categoryButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedCategoryButton: {
        backgroundColor: '#84BFF3',
    },
    categoryButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'auto',
    },
    selectedCategoryButtonText: {
        color: 'white',
    }
});

export default ServicesCustomer;