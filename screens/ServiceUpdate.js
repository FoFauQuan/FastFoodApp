import React, { useState } from "react";
import { View, Image,StyleSheet, ScrollView } from 'react-native'
import {Text, TextInput, Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";

const ServiceUpdate = ({ route, navigation }) => {
    const { service } = route.params;
    const [title, setTitle] = useState(service.title);
    const [price, setPrice] = useState(service.price);
    const [describe, setDescribe] = useState(service.describe);
    const [imagePath, setImagePath] = useState(service.image);

    const handleUpdateService = async () => {
        try {
            await firestore()
                .collection('Services')
                .doc(service.id)
                .update({
                    title: title,
                    price: price,
                    describe: describe,
                });
            if (imagePath !== service.image) {
                const refImage = storage().ref(`/services/${service.id}.png`);
                await refImage.putFile(imagePath);
                const imageLink = await refImage.getDownloadURL();
                await firestore()
                    .collection('Services')
                    .doc(service.id)
                    .update({
                        image: imageLink
                    });
            }

            navigation.goBack();
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
        }
    }

    const handleUploadImage = () =>{
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300
        })
        .then(image =>
            setImagePath(image.path)
        )
        .catch(e=> console.log(e.message))
    }

    return (
        <View style={{ padding: 10 }}>
            <ScrollView>
            {((imagePath !== "") &&
            <Image source={{uri: imagePath}}
                style={{height: 250, width:250, alignSelf:'center'}}
            />
            )}
            <Button 
            mode='elevated'
            labelStyle={styles.label}
            style={styles.buttonpic}
             onPress={handleUploadImage}>
                Upload Image
            </Button>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Service name *</Text>
            <TextInput
                style={styles.text}
                value={title}
                onChangeText={setTitle}
                placeholder="Input a service name"
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Describe *</Text>
            <TextInput
                value={describe}
                onChangeText={setDescribe}
                multiline
                numberOfLines={3}
                style={styles.text}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price *</Text>
            <TextInput
                style={styles.text}
                value={price}
                onChangeText={setPrice}
                placeholder="0"
                keyboardType="numeric"
            />
            <Button 
                mode='elevated'
                labelStyle={styles.label}
                onPress={handleUpdateService}
                style={styles.button}>
                    Update
            </Button>
            </ScrollView>
        </View>
    );
}
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
export default ServiceUpdate;
