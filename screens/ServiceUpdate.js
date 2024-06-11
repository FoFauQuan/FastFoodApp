import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from "react-native-paper";
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
            console.error("Error updating service:", error);
        }
    };

    const handleUploadImage = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300
        })
        .then(image =>
            setImagePath(image.path)
        )
        .catch(e => console.log(e.message));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {imagePath !== "" && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imagePath }} style={styles.image} />
                </View>
            )}
            <Button 
                mode='contained' 
                onPress={handleUploadImage} 
                style={styles.buttonPic}
                labelStyle={styles.buttonLabel}
            >
                Upload Image
            </Button>
            <Text style={styles.label}>Service Name *</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Input a service name"
            />
            <Text style={styles.label}>Description *</Text>
            <TextInput
                style={styles.input}
                value={describe}
                onChangeText={setDescribe}
                multiline
                numberOfLines={3}
            />
            <Text style={styles.label}>Price *</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="0"
                keyboardType="numeric"
            />
            <Button 
                mode='contained' 
                onPress={handleUpdateService} 
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Update
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: 400,
        borderRadius: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#84BFF3',
    },
    buttonPic: {
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        backgroundColor: '#84BFF3',
    },
    buttonLabel: {
        fontSize: 18,
        color: 'white',
    },
});

export default ServiceUpdate;
