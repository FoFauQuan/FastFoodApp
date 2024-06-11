import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "./RouterService";
import Setting from "../screens/Setting";
import Customers from "../ScreenAdmin/Customers";
import Profile from "../screens/Profile";
import { Image,View } from "react-native";
import Category from "../ScreenAdmin/Category";
import ProfileNavi from "./ProfileNavi";
import CartOrdersPageAdmin from "../ScreenAdmin/CartOrdersPageAdmin";

const Tab = createMaterialBottomTabNavigator();

const AdminNavi = () => {
  return (
    <Tab.Navigator
    activeColor="blue"
    barStyle={{ paddingBottom: 5,backgroundColor:'white', }}>
      <Tab.Screen
        name="RouterService"
        component={RouterService}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartOrders"
        component={CartOrdersPageAdmin}
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
        name="ProfileNavi"
        component={ProfileNavi}
        options={{
          tabBarLabel:'Customer',
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/customer.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel:'Category',
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/folder-management.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
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

export default AdminNavi;
