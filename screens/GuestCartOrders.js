import React, { useEffect, useState } from 'react';
import {  View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, } from 'react-native-paper';

const GuestCartOrders = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity  
            style={styles.box1}>
                <Text style={styles.textbox1}>
                    Please log in to view orderhistory in {'\n'} The Setting
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:5,
        paddingTop:50,
        justifyContent:'center'
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
        padding:10,
        borderWidth: 0.5,
        borderColor: 'blue', 
    },
    box:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
        backgroundColor: 'white',
        borderRadius:2
    },
    box1:{
        borderWidth: 0.2,
        padding: 10,
        marginVertical:5,
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
        paddingVertical:18,
        fontWeight: 'bold'
    }
});
export default GuestCartOrders;
