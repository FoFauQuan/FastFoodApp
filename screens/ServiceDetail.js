import React from "react"
import { View, Image,StyleSheet } from "react-native"
import { Text } from "react-native-paper"

const ServiceDetail = ({ route }) => {
    const { service } = route.params
    return (
        <View style={{flex:1,padding:20,backgroundColor:'white'}}>
        <View style={{flex:1,backgroundColor:'white',padding:10}}>
            {service.image !== "" && (
                <View style={{ flexDirection: 'row',borderWidth:0.5 }}>
                    <Image
                        source={{ uri: service.image }}
                        style={{ height: 300, width: '100%' }}
                        resizeMode="contain"
                    />
                </View>
            )}
            <View style={styles.row}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Service name: </Text>
                <Text style={{ fontSize: 20}}>{service.title}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price: </Text>
                <Text style={{ fontSize: 20}}>{service.describe} </Text>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price: </Text>
                <Text style={{ fontSize: 20}}>{service.price} ₫</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CreateBy: </Text>
                <Text style={{ fontSize: 20}}>{service.create}</Text>
            </View>
        </View>
        </View>
    )
}

export default ServiceDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignContent:'center',
        justifyContent:'center'
    },
    headerText: {
        padding: 15,
        fontSize: 35,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderWidth:0.5
    },
})