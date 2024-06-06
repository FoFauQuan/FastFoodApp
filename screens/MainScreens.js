
import { Image, StyleSheet,Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const MainScreens = ({navigation}) => {
    return (
        <View style={{
            flex:1
        }}>
        <Image source={require("../assets/logo.jpg")}
          style={{
            flex:3,
          }}
        />
        <View style={{
            flex:1,}}>
            <Text style={styles.text}>
            Login to enjoy the best service !
            </Text>
            <Button 
            mode='contained'
            labelStyle={styles.label}
            onPress={() => navigation.navigate("Login")}
            style={styles.button}>
                Login
            </Button>
            <Button 
            mode='elevated'
            labelStyle={styles.label2}
            onPress={() => navigation.navigate("GuestNavi")}
            style={styles.button2}>
                Countiue as Guest
            </Button>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        borderRadius:5,
        backgroundColor:'blue',
        padding:5,
        margin:5,
        marginBottom:10,
        borderWidth: 0.5,
        borderColor: 'white'
    },
    button2:{
        borderRadius:5,
        padding:5,
        margin:5,
        borderWidth: 0.5,
        borderColor: 'blue', 
    },
    text:{
        margin:5,
        marginVertical:10,
        textAlign:'center',
        fontFamily:'bold',
        fontSize:28
    },
    label:{
        fontSize:20
    },
    label2:{
        fontSize:20,
        color:'blue'
    }
})
export default MainScreens;
