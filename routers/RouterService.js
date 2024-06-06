import { createStackNavigator } from "@react-navigation/stack";
import Services from '../screens/Services';
import AddNewService from '../screens/AddNewService';
import ServiceDetail from '../screens/ServiceDetail';
import ServiceUpdate from "../screens/ServiceUpdate";
import { useMyContextProvider } from "../src/index";

import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const RouterService = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;
    return (
        <Stack.Navigator
            initialRouteName="Services"
        >
            <Stack.Screen name="Services" component={Services}
            options={{headerLeft: null, headerShown: false}}/>
            <Stack.Screen name="AddNewService" component={AddNewService} />
            <Stack.Screen name="ServiceDetail"component={ServiceDetail}     
            />
            <Stack.Screen name="ServiceUpdate" component={ServiceUpdate} />
        </Stack.Navigator>
    )
}

export default RouterService;
