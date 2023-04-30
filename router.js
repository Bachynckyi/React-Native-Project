import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from './screens/auth/LoginScreen';
import PostsScreen from "./screens/main/PostsScreen";
import CreateScreen from "./screens/main/CreateScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
    if (!isAuth) {
      return (
        <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        </AuthStack.Navigator> 
      );}
      return (
        <MainTab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 83,
              display: "flex",
              paddingHorizontal: 81,
              paddingTop: 9,
              paddingBottom: 34,
            },
          }}>
        <MainTab.Screen 
            name="Posts" 
            component={PostsScreen} 
            options={{
                tabBarIcon: ({ focused, size, color }) => (
                <Feather name="grid" size={size} color={color} />),
                tabBarItemStyle: { borderRadius: 20 },
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarActiveTintColor: "#FFFFFF",
                headerShown: false,
                }}/>
        <MainTab.Screen 
            name="Create " 
            component={CreateScreen} 
            options={{
                tabBarIcon: ({ focused, size, color }) => (
                  <Feather name="plus" size={size} color={color} />
                ),
                tabBarItemStyle: { borderRadius: 20 },
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarActiveTintColor: "#FFFFFF",
                title: "Создать публикацию",
                headerTitleAlign: "center",
                tabBarHideOnKeyboard: true,
              }}/>
          <MainTab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{
                tabBarIcon: ({ focused, size, color }) => (
                  <Feather name="user" size={size} color={color} />
                ),
                tabBarItemStyle: { borderRadius: 20 },
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarActiveTintColor: "#FFFFFF",
                headerTitleAlign: "center",
              }}/>
        </MainTab.Navigator>)
};