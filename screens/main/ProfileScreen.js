import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { collection, getDocs, query, orderBy, doc, where } from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { Feather } from "@expo/vector-icons";


const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { login, userId} = useSelector((state) => state.auth);

  useEffect(() => {
    getUsersPosts();
    console.log(posts)
  }, []);

  const signOut = () => {
    setPosts([]);
    dispatch(authSignOutUser());
  };

  const getUsersPosts = async () => {
        const postsRef = await collection(db, "posts");
        const q = query(
        postsRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map((doc) => ({...doc.data()})));
};


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/images/BG.png")}
      >
        <View style={styles.profileContainer}>
          {loading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#FF6C00" />
            </View>
          )}
          <TouchableOpacity
            style={{ position: "absolute", right: 20, top: 20 }}
            onPress={() => {
              signOut();
            }}
          >
            <Image
              source={require("../../assets/images/logOut.jpg")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>

          </View>
          <Text style={styles.nickname}>{login}</Text>

          {posts.length > 0 ? (
            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.postsContainer}>
                  <Image style={styles.photo} source={{ uri: item.photoURL }} />
                  <Text style={styles.photoName}>{item.title}</Text>
                  <View style={styles.details}>
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
              )}
            />
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.noPostsText}>Немає постів</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profileContainer: {
    flex: 1,
    marginTop: 120,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    left: "34%",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 10,
  },
  avatar: {
    maxWidth: "100%",
    borderRadius: 10,
    height: 120,
    width: "100%",
    resizeMode: "cover",
  },
  postsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 10,
  },
  photoName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsBlock: {
    flexDirection: "row",
  },
  location: {
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  nickname: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 90,
    marginBottom: 30,
  },
  noPostsText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  textContainer: {
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 50,
    marginBottom: 30,
  },
});

export default ProfileScreen;