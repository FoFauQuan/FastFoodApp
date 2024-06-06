import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Alert,FlatList,TouchableOpacity,Image } from 'react-native';
import { Button,Text,TextInput } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore"
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";

const Category = () => {
    const CATEGORY = firestore().collection("CATEGORY")
    const [category, setCategory] = useState([]);
    const [title, setTitle] = useState('')
    const [imagePath, setImagePath] = useState('');

    const handleAddNewCategory =()=>{
        CATEGORY.add({
            title,
        })
        .then(response => {
            const refImage = storage().ref("/category/" + response.id + ".png");
            refImage.putFile(imagePath)
            .then(() => refImage.getDownloadURL()
                .then(link => {
                    CATEGORY.doc(response.id).update({
                        id: response.id,
                        image: link
                    });
                    Alert.alert("Add category success.");
                    setTitle('');
                    setImagePath('');
                })
            )
            .catch(e => console.log(e.message));
        });
    }
    useEffect(() => {
        const unsubscribe = CATEGORY.onSnapshot(querySnapshot => {
            const categorydata = [];
            querySnapshot.forEach(documentSnapshot => {
                categorydata.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                });
            });
            setCategory(categorydata);
        });
    
        return () => unsubscribe();
    }, []);
    const handleDelete = (service) => {
        Alert.alert(
            "Warning",
            "Are you sure you want to cancel this service? This operation cannot be returned",
            [
                {
                    text: "Back",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        firestore()
                            .collection('CATEGORY')
                            .doc(service.id)
                            .delete()
                            .then(() => {
                                console.log("Dịch vụ đã được hủy thành công!");
                            })
                            .catch(error => {
                                console.error("Lỗi khi hủy dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        )
    }
    const renderItem =({item,index})=>(
        <View style={{ margin: 5,
                padding:15, 
                borderRadius: 5, 
                marginVertical: 5, 
                backgroundColor: '#84BFF3',
                flexDirection:'row',
                justifyContent:'space-between',
                alignContent:'center' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold",alignSelf:'center' }}>{index+1}. {item.title}</Text>
            <TouchableOpacity 
                    style={{borderWidth:1,
                    borderRadius:10,
                    backgroundColor: 'pink'}} 
                    onPress={() => handleDelete(item)}>
                <Text style={{alignSelf:'center',fontSize: 18,padding:5}}>
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
    )
    const handleUploadImage = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 200,
            height: 150
        })
        .then(image => setImagePath(image.path))
        .catch(e => console.log(e.message));
    }
    return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold',margin:10 }}>Service name *</Text>
            {imagePath !== "" && (
                <Image source={{ uri: imagePath }} style={{ height: 200 }} />
            )}
            <Button 
            mode='elevated'
            labelStyle={styles.label}
            style={styles.buttonpic}
             onPress={handleUploadImage}
             >
                Upload Image
            </Button>

            <TextInput
                mode='outlined'
                cursorColor='pink'
                theme={{
                colors: {
                    primary: '#4858AD', // Màu viền khi được chọn
                    underlineColor: 'transparent', // Màu gạch chân khi không được chọn
                },
                }}
                label={"Category"}
                value={title}
                onChangeText={setTitle}
                style={{marginHorizontal:10}}
            />
          <Button 
                mode='elevated'
                labelStyle={styles.label}
                onPress={handleAddNewCategory}
                style={styles.button}>
                Add New Category
            </Button>
            <Text style={{ fontSize: 20, fontWeight: 'bold',margin:10 }}>List Category :</Text>
            <FlatList
                data={category}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:5,
        paddingTop:50,
    },
    textheader:{
        alignSelf: 'center',
        fontSize: 30,
        paddingBottom:20,
    },
    label:{
        fontSize:20,
        color:'blue'
    },
    button:{
        borderRadius:10,
        padding:5,
        margin:5,
        borderWidth: 0.5,
        borderColor: 'blue', 
        marginTop:20,
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
    box:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
        backgroundColor: 'white',
        borderRadius:2
    },
    textbox:{
        fontSize:18,
        padding:10,
    },
});
export default Category;
