import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterServiceCustomer from "./RouterServiceCustomer";
import { Image,View } from "react-native";
import Home from "../ScreenHome/Home";
import Checkout from "../ScreenHome/Checkout";
import CartOrdersPage from "../ScreenHome/CartOrdersPage";
import GuestSetting from "../screens/GuestSetting";
import GuestCartOrders from "../screens/GuestCartOrders";

const Tab = createMaterialBottomTabNavigator();

const GuestNavi = () => {
  return (
    <Tab.Navigator
    activeColor="blue"
    barStyle={{
      backgroundColor:'white',
      borderRadius:20
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/check.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RouterServiceCustomer"
        component={RouterServiceCustomer}
        options={{
          tabBarLabel:'',
          tabBarIcon: ({ color }) => (
            <View
            style={{
              top:-10,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../assets/hamburger-menu.png")}
              style={{ width: 80, height: 80, tintColor: color }}
            />
          </View>
          ),
        }}
      />
      <Tab.Screen
        name="CartOrdersPage"
        component={GuestCartOrders}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/transaction-history.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={GuestSetting}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/setting.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default GuestNavi;
