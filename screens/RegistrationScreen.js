import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, 
        View, 
        KeyboardAvoidingView, 
        TextInput, 
        Text, 
        Platform, 
        TouchableOpacity, 
        ImageBackground, 
        TouchableWithoutFeedback,
        Image,
        Keyboard} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setIsShowKeyboard(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setIsShowKeyboard(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [isFocus, setIsFocus] = useState({
      login: false,
      email: false,
      password: false,
    });
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const keyboardHide = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    };
    const submitForm = () => {
      console.log(state);
      setState(initialState);
    };

    const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    });
  
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    };

    return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground source={require("../assets/images/BG.png")} style={styles.image}>
        <View style={styles.iconRectangle}>
            <Image source={require("../assets/images/rectangle.png")} />
            <Image
              style={styles.iconAdd}
              source={require("../assets/images/add.png")}
            />
          </View>

          <View style={styles.formContainer}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={styles.inputForm}>
                  <Text style={styles.title}>Регистрация</Text>
                  <TextInput 
                    style={{...styles.input, 
                            borderColor: isFocus.login ? `#FF6C00` : `#E8E8E8`,
                            backgroundColor: isFocus.login ? `#ffffff` : `#F6F6F6`}} 
                    placeholder="Логин"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => {
                      setIsFocus({ ...isFocus, login: true })
                    }}
                    onBlur={() => {
                      setIsFocus({ ...isFocus, login: false });
                    }}
                    value={state.login}
                    onChangeText={(value) => {
                      setState((prevState) => ({ ...prevState, login: value }));
                    }}
                    />
                  <TextInput 
                    style={{...styles.input, 
                      borderColor: isFocus.email ? `#FF6C00` : `#E8E8E8`,
                      backgroundColor: isFocus.email ? `#ffffff` : `#F6F6F6`}} 
                    placeholder="Адрес электронной почты"
                    keyboardType="email-address"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => {
                      setIsFocus({ ...isFocus, email: true })
                    }}
                    onBlur={() => {
                      setIsFocus({ ...isFocus, email: false });
                    }}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    />
                  <TextInput 
                    style={{...styles.input, 
                        borderColor: isFocus.password ? `#FF6C00` : `#E8E8E8`,
                        backgroundColor: isFocus.password ? `#ffffff` : `#F6F6F6`}} 
                    placeholder="Пароль" 
                    secureTextEntry={isSecureEntry}
                    onFocus={() => {
                      setIsFocus({ ...isFocus, password: true })
                    }}
                    onBlur={() => {
                      setIsFocus({ ...isFocus, password: false });
                    }}
                    value={state.password}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))}
                    />
                  <TouchableOpacity
                      style={styles.passwordText}
                      onPress={() => {
                        setIsSecureEntry((prevState) => !prevState);
                      }}
                    >
                      <Text>{isSecureEntry ? "Показать" : "Скрыть"}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView> 
                {!isShowKeyboard && 
                (<View>
                  <TouchableOpacity style={styles.button} onPress={submitForm}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <Text 
                    style={styles.link} 
                    onPress={() => navigation.navigate("Login")}>
                    У вас уже есть аккаунт? Войти
                  </Text>
                </View>)}
            </View>   
            </ImageBackground>
      </View>
      </TouchableWithoutFeedback>  
    );
  };

  export default RegistrationScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "flex-end",
    },
    formContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    inputForm: {
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginTop: 76,
      marginBottom: 32,
      color: '#212121', 
      fontSize: 30,
      lineHeight: 35,
      fontFamily: "Roboto-Medium",
      },
    input: {
      backgroundColor: '#F6F6F6',
      height: 50,
      borderWidth: 1, 
      borderColor: '#E8E8E8',
      borderRadius: 8,
      marginBottom: 16,
      paddingLeft: 16,
      fontSize: 16,
      lineHeight: 19,
      fontFamily: "Roboto-Regular",
    },
    button: {
      height: 51, 
      justifyContent: "center",
      alignItems: "center",
      marginTop: 43,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
      backgroundColor: "#FF6C00",
      borderRadius: 100,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      lineHeight: 19,
      fontFamily: "Roboto-Regular",
    },
    link: {
      alignSelf: 'center',
      fontSize: 16,
      lineHeight: 19,
      marginBottom: 76,
      fontFamily: "Roboto-Regular",
      color: "#1B4371",
    },
    passwordText: {
      position: "absolute",
      top: "85%",
      left: "80%",
      color: "#1B4371",
      fontSize: 16,
      lineHeight: 19,
      color: "#1B4371",
    },
    iconRectangle: {
      left: "35%",
      top: "7%",
      zIndex: 1,
      width: 120,
      height: 120,
    },
    iconAdd: {
      position: "absolute",
      left: "90%",
      top: "65%",
    },
  });
