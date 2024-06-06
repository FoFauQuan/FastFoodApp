import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useMyContextProvider } from "../src/index";

const { width: screenWidth } = Dimensions.get('window');

const Home = ({ navigation }) => {
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [bannerUrls, setBannerUrls] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch the banner images URLs from Firebase storage
        const fetchBannerImages = async () => {
            try {
                const bannerRefs = await storage().ref('/category/').listAll();
                const urls = await Promise.all(
                    bannerRefs.items.map(item => item.getDownloadURL())
                );
                setBannerUrls(urls);
            } catch (error) {
                console.error("Error fetching banner images: ", error);
            }
        };

        fetchBannerImages();

        // Fetch the categories from Firestore
        const unsubscribe = firestore().collection('CATEGORY').onSnapshot(querySnapshot => {
            const categoryData = [];
            querySnapshot.forEach(documentSnapshot => {
                categoryData.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                });
            });
            setCategories(categoryData);
        });

        return () => unsubscribe();
    }, []);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.categoryContainer} 
            onPress={() => navigation.navigate('ServicesCustomer', { categoryId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
            {bannerUrls.length > 0 && (
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={true}
                    style={styles.scrollView}
                >
                    {bannerUrls.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.bannerImage} />
                    ))}
                </ScrollView>
            )}
            <Text style={styles.welcomeText}>Welcome back: {userLogin != null && userLogin.fullName}</Text>
            <TouchableOpacity
            onPress={()=>navigation.navigate("RouterServiceCustomer")} 
            style={styles.box1}>
                <Text style={styles.textbox1}>
                    GO TO MENU
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <Text style={styles.textbox}>
                    Track The Order 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <Text style={styles.textbox}>
                    Connect With Us
                </Text>
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Menu</Text>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    scrollView: {
        height: 200,
    },
    bannerImage: {
        width: screenWidth,
        height: 200,
        resizeMode: 'cover',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10,
    },
    MenuText: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 15,
    },
    categoryList: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    categoryContainer: {
        marginRight: 15,
        alignItems: 'center',
    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    categoryTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    box:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
        marginHorizontal:5,
        backgroundColor: 'white',
        borderRadius:2
    },
    box1:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
        marginHorizontal:5,
        backgroundColor: '#84BFF3',
        borderRadius:2
    },
    textbox:{
        fontSize:18,
        padding:10,
    },
    textbox1:{
        fontSize:20,
        padding:10,
        fontWeight: 'bold'
    }
});

export default Home;
