import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreateScreen from './CreateScreen';
import ProfileScreen from './ProfileScreen';
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
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
                }}/>
        <MainTab.Screen 
            name="Create" 
            component={CreateScreen} 
            options={{
                tabBarIcon: ({ focused, size, color }) => (
                  <Feather name="plus" size={size} color={color} />
                ),
                tabBarItemStyle: { borderRadius: 20 },
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarActiveTintColor: "#FFFFFF",
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
              }}/>
        </MainTab.Navigator>)
};

export default Home;