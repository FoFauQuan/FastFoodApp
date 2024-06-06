import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import Register from "../screens/Register"
import AdminNavi from "./AdminNavi"
import CustomerNavigation from "./CustomerNavigation"
import ForgotPassword from "../screens/ForgotPassword"
import MainScreens from "../screens/MainScreens"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert, Image, View,Text } from "react-native";
import { useMyContextProvider } from "../src/index";
import ChangePass from "../screens/ChangePass"
import ProfileCustomer from "../ScreenHome/ProfileCustomer"
import GuestNavi from "./GuestNavi"


const Stack = createStackNavigator()

const Router = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="MainScreens"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#84BFF3',
                },
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            source={require('../assets/logogo.png')}
                            style={{ width: 70, height: 70 }}
                        />
                        {/* <Text style={{ fontSize: 20, alignSelf: 'center' }}>
                            {userLogin != null && userLogin.fullName}
                        </Text> */}
                    </View>
                ),
            }}
        >
            <Stack.Screen
                name="MainScreens"
                component={MainScreens}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Admin"
                component={AdminNavi}
                options={{
                    headerLeft: null,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Customer"
                component={CustomerNavigation}
                options={{
                    // title: userLogin != null && userLogin.fullName,
                    headerLeft: null,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChangePass"
                component={ChangePass}
                options={{
                }}
            />
            <Stack.Screen
                name="ProfileCustomer"
                component={ProfileCustomer}
                options={{
                }}
            />
            <Stack.Screen
                name="GuestNavi"
                component={GuestNavi}
                options={{
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    );
};

export default Router;