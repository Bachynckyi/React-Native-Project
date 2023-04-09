import React from "react";
import { StyleSheet, 
        View, 
        Text } from "react-native";

const CreateScreen = () => {
        return(
                <View style={styles.container}>
                        <Text>Create</Text>
                </View>
        )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
});

export default CreateScreen;