import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from './screens/auth/LoginScreen';
import Home from "./screens/main/Home";

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
        <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
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
      )
};