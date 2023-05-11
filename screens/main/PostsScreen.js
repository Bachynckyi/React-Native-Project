import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./nestedScreens/DefaultScreenPosts";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();


const PostsScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  const navigation = useNavigation();
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
      }}/>
      <NestedScreen.Screen 
        name="Comments" 
              component={CommentsScreen} 
              options={{
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather
                      name="arrow-left"
                      size={24}
                      color="#212121"
                      style={{ marginLeft: 16 }}
                    />
                  </TouchableOpacity>
                ),
              title: "Комментарии",
              headerTitleAlign: "center",
            }}
            />
      <NestedScreen.Screen 
        name="Map" 
            component={MapScreen} 
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather
                    name="arrow-left"
                    size={24}
                    color="#212121"
                    style={{ marginLeft: 16 }}
                  />
                </TouchableOpacity>
              ),
            title: "Карта",
            headerTitleAlign: "center",
          }}/>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;