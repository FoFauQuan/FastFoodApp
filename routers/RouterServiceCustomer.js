import { createStackNavigator } from "@react-navigation/stack";
import ServicesCustomer from '../ScreenHome/ServicesCustomer';
import { useMyContextProvider } from "../src/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import Cart from "../ScreenHome/Cart";
import Checkout from "../ScreenHome/Checkout";
import CashPayment from "../ScreenHome/CashPayment";

const Stack = createStackNavigator();

const RouterServiceCustomer = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        <Stack.Navigator
            initialRouteName="ServicesCustomer"
        >
            <Stack.Screen options={{headerLeft: null, headerShown: false}} name="ServicesCustomer" component={ServicesCustomer} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="CashPayment" component={CashPayment} />
        </Stack.Navigator>
    )
}

export default RouterServiceCustomer;
