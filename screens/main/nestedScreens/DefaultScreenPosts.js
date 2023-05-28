import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, View, StyleSheet, FlatList, Text} from "react-native";
import { Feather } from "@expo/vector-icons";
import {db} from "../../../firebase/config";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";



const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, userId } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const postsRef = await collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };
  
  useEffect(() => {
    getAllPosts()
  }, []);
  
  return (
    <View style={styles.container}>
        <View style={styles.wrapperUser}>
        <Image
          source={require("../../../assets/images/Rectangle22.png")}
          style={styles.userPhoto}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
        </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>        
            <View>
                <Image
                  source={{ uri: item.photoURL}}
                  style={{ width: 380, height: 200, borderRadius: 8}}
                />
                <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.addInformation}>
              <TouchableOpacity onPress={() => navigation.navigate("Comments", {postId: item.id})}>
                <Feather
                  name="message-circle"
                  size={18}
                  color="#BDBDBD"
                  style={styles.commentsIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Map")}
                style={styles.map}
              >
                <Feather
                  name="map-pin"
                  size={18}
                  color="#BDBDBD"
                  style={styles.mapIcon}
                />
                <Text style={styles.textMap}>{item.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}/>  
    </View>
  );
};
export default DefaultScreenPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userPhoto: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  wrapperUser: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
    width: 353,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginRight: 16,
    marginTop: 8,
  },
  addInformation: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 376,
  },
  map: {
    position: "relative",
  },
  mapIcon: {
    position: "absolute",
  },
  textMap: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textAlign: "right",
    textDecorationLine: "underline",
  },
});