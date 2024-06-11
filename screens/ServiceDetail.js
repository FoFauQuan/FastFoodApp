import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";

const ServiceDetail = ({ route }) => {
    const { service } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {service.image !== "" && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: service.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            )}
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.label}>Service Name</Text>
                    <Text style={styles.value}>{service.title}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.value}>{service.describe}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.value}>{service.price} ₫</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Created By</Text>
                    <Text style={styles.value}>{service.create}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ServiceDetail;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    imageContainer: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        height: 300,
        width: '100%',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    row: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
});
