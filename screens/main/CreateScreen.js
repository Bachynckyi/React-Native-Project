import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Platform, TextInput, TouchableOpacity, Keyboard, Image, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import {Camera} from "expo-camera";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

const CreateScreen = ({ navigation }) => {
        const [camera, setCamera] = useState(null);
        const [photo, setPhoto] = useState("");
        const [location, setLocation] = useState(null); 
        const [formValues, setFormValues] = useState({ title: "", location: "" });
        const [isFormValid, setIsFormValid] = useState(false);
        const [isShowKeyboard, setIsShowKeyboard] = useState(false);

        const keyboardHide = () => {
                setIsShowKeyboard(false);
                Keyboard.dismiss();
        };

        const takePhoto = async () => {
                const photoCamera = await camera.takePictureAsync();
                setPhoto(photoCamera.uri);
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);
        };

        useEffect(() => {
                if (formValues.title && formValues.location && photo) {
                  setIsFormValid(true);
                } else {
                  setIsFormValid(false);
                }
              }, [formValues]);

        const sendPhoto = () => {
                navigation.navigate("DefaultScreen", {
                        title: formValues.title,
                        location: formValues.location,
                        photo: photo,
                        locationCoordinate: location,
                      });
                setFormValues({ title: "", location: "" });
                setPhoto("");
                setLocation("");
        };

        return(
                <TouchableWithoutFeedback onPress={keyboardHide}>
                <View style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} >
                <View>
                        <Camera style={styles.camera} ref={setCamera}>
                        {photo &&
                        <View style={styles.takePhotoContainer}>
                                <Image
                                        source={{uri: photo }}
                                        style={{ height: "100%", width: "100%"}}
                                />
                        </View>}
                                <TouchableOpacity 
                                        onPress={takePhoto} 
                                        style={styles.cameraBtn}>
                                <FontAwesome
                                        name="camera"
                                        size={24}
                                        style={{color: "#BDBDBD"}}/>
                                </TouchableOpacity>
                        </Camera>
                        {!photo ? (
                                <Text style={styles.placeholderText}>Загрузите фото</Text>
                        ) : (
                                <Text style={styles.placeholderText}>Редактировать фото</Text>
                        )}
                   <View>
                        <TextInput
                                style={styles.inputTitle}
                                placeholder="Название..."
                                value={formValues.title}
                                onChangeText={(value) =>
                                  setFormValues({ ...formValues, title: value })
                                }
                                onFocus={() => {
                                        setIsShowKeyboard(true);
                                      }}
                        ></TextInput>
                        <View style={styles.inputMapWrapper}>
                                <Feather
                                        name="map-pin"
                                        size={18}
                                        color="#BDBDBD"
                                        style={styles.mapIcon}
                                />
                                <TextInput
                                        style={styles.inputMap}
                                        placeholder="Местность..."
                                        value={formValues.location}
                                        onChangeText={(value) =>
                                          setFormValues({ ...formValues, location: value })
                                        }
                                        onFocus={() => {
                                                setIsShowKeyboard(true);
                                              }}
                                ></TextInput>
                        </View>
                   </View>
                   <TouchableOpacity 
                                style={[styles.buttonSubmit, !isFormValid && styles.disabledButton]}
                                onPress={() => {
                                        if (isFormValid) {
                                          sendPhoto();
                                        }
                                      }}>
                               <Text style={{...styles.textButtonSubmit, color: isFormValid ? "#FFFFFF" : "#BDBDBD",}}>
                                Опубликовать
                                </Text>
                   </TouchableOpacity>
                </View>   
                </KeyboardAvoidingView>
                </View>
        </TouchableWithoutFeedback>
        )  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
      },
     camera: {
        height: 267,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
     },
     inputTitle: {
        marginTop: 32,
        fontSize: 16,
        lineHeight: 19,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
     },
     inputMap: {
        marginTop: 10,
        paddingLeft: 20,
        fontSize: 16,
        lineHeight: 19,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
      },
      cameraBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
      },
      placeholderText: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
      },
      buttonSubmit: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        height: 51,
        marginTop: 32,
        marginBottom: 120,
        justifyContent: "center",
        alignItems: "center",
      },
      textButtonSubmit: {
        fontSize: 16,
        lineHeight: 19,
      },
      inputMapWrapper: {
        position: "relative",
      },
      mapIcon: {
        position: "absolute",
        top: 24,
      },
      inputMap: {
        marginTop: 10,
        paddingLeft: 20,
        fontSize: 16,
        lineHeight: 19,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
      },
      takePhotoContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      },
      disabledButton: {
        backgroundColor: "#F6F6F6",
      },
});

export default CreateScreen;



