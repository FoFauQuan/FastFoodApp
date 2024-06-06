import React, { useState, useEffect } from "react";
import { View, Image, Alert, ScrollView,StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import RNPickerSelect from 'react-native-picker-select';
import { useMyContextProvider } from "../src/index";

const AddNewService = ({ route, navigation }) => {
    const { categoryId } = route.params ? route.params : {};
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [imagePath, setImagePath] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [describe, setDescribe] = useState('');
    const [category, setCategory] = useState(categoryId);
    const [categories, setCategories] = useState([]);
    const SERVICES = firestore().collection("Services");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categorySnapshot = await firestore().collection("CATEGORY").get();
                const categoryList = categorySnapshot.docs.map(doc => ({
                    label: doc.data().title,
                    value: doc.id,
                    key: doc.id // Thêm key ở đây
                }));
                setCategories(categoryList);
            } catch (error) {
                console.log("Error fetching categories: ", error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddNewService = () => {
        SERVICES.add({
            title,
            price,
            describe,
            categoryId: category,
            create: userLogin.email
        })
        .then(response => {
            const refImage = storage().ref("/services/" + response.id + ".png");
            refImage.putFile(imagePath)
            .then(() => refImage.getDownloadURL()
                .then(link => {
                    SERVICES.doc(response.id).update({
                        id: response.id,
                        image: link
                    });
                    Alert.alert("Thêm dịch vụ thành công.");
                    navigation.navigate("Services");
                })
            )
            .catch(e => console.log(e.message));
        });
    }

    const handleUploadImage = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300
        })
        .then(image => setImagePath(image.path))
        .catch(e => console.log(e.message));
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Service name *</Text>
            {imagePath !== "" && (
                <Image source={{ uri: imagePath }} style={{ height: 250, width:250,alignSelf:'center' }} />
            )}
            <Button 
            mode='elevated'
            labelStyle={styles.label}
            style={styles.buttonpic}
             onPress={handleUploadImage}>
                Upload Image
            </Button>
            <TextInput
                placeholder="Input a service name"
                value={title}
                onChangeText={setTitle}
                style={styles.text}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price *</Text>
            <TextInput
                placeholder="0"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.text}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Describe *</Text>
            <TextInput
                value={describe}
                onChangeText={setDescribe}
                multiline
                numberOfLines={3}
                style={styles.text}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Category</Text>
            <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={categories}
                placeholder={{ label: "Chọn loại hình", value: null }}
                value={category}
                style={styles.text}
            />
            <Button 
            mode='elevated'
            labelStyle={styles.label}
            onPress={handleAddNewService}
            style={styles.button}>
                Add
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text:{
        marginBottom: 10, 
        borderWidth: 1, 
        borderColor: 'white'
    },
    button:{
        borderRadius:10,
        padding:5,
        borderWidth: 0.5,
        borderColor: 'blue', 
        marginTop:20,
        marginBottom:5,
        backgroundColor:'#84BFF3'
    },
    buttonpic:{
        borderRadius:10,
        padding:5,
        marginHorizontal:100,
        borderWidth: 0.5,
        borderColor: 'blue', 
        marginTop:20,
        marginBottom:5,
        backgroundColor:'#84BFF3'
    },
    label:{
        fontSize:20
    },
});
export default AddNewService;
