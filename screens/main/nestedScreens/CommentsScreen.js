import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Keyboard } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { db } from "../../../firebase/config";
import { doc, collection, addDoc, getDocs, getDoc, query, orderBy } from "firebase/firestore";


const CommentsScreen = ({route}) => {
  const postId = route.params.postId;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [comment, setComment] = useState("");
  const { login } = useSelector((state) => state.auth);
  const [allComments, setAllComments] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    getAllPosts();
  }, []);


  const createPost = async () => {

    if (!comment) {
      keyboardHide();
      return;
    };
    const docRef = await doc(db, "posts", postId);
      await addDoc(collection(docRef, "comments"), {
        comment,
        login,
        createdAt: Date.now().toString()});
    setComment("");
    await getAllPosts();
    keyboardHide();
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
 
  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const getAllPosts = async () => {
    const docRef = await doc(db, "posts", postId);
    const commentRef = await collection(docRef, "comments");
    const q = query(commentRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setAllComments(snapshot.docs.map((doc) => ({...doc.data()})));
  }

  const renderItem = ({ item, index }) => (
    <View
      style={
        index % 2 === 0
          ? styles.commentContainerEven
          : styles.commentContainerOdd
      }
    >
      <View
        style={
          index % 2 === 0 ? styles.imageContainerEven : styles.imageContainerOdd
        }
      >
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.photoUser} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.login.split("")[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.textComment}>
        <Text
          style={
            index % 2 === 0
              ? styles.textCommentLoginEven
              : styles.textCommentLoginOdd
          }
        >
          {item.login}
        </Text>
        <Text style={styles.textCommentText}>{item.comment}</Text>
        <Text
          style={
            index % 2 === 0
              ? styles.textCommentDateEven
              : styles.textCommentDateOdd
          }
        >
          {Date(item.createdAt)}
        </Text>
      </View>
    </View>
  );


  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.form}>
        <Image source={{}} style={styles.postImage} />
        <FlatList
          data={allComments}
          removeClippedSubviews={true}
          initialNumToRender={10}
          scrollEventThrottle={1}
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View
            style={{
              paddingBottom: !isShowKeyboard ? 5 : 200,
            }}
          >
            <View
              style={{
                ...styles.input,
                borderColor: isFocus ? `#FF6C00` : `#E8E8E8`,
              }}
            >
              <TextInput
                style={styles.inputText}
                onBlur={keyboardHide}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Прокоментувати..."
                value={comment}
                onChangeText={(value) => {
                  setComment(value);
                }}
              />
              <TouchableOpacity
                style={styles.sendGroup}
                onPress={createPost}
              >
                <View style={styles.sendIcon}>
                  <Feather name="arrow-up" size={24} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};


export default CommentsScreen;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    flex: 1,
    marginTop: 10,
  },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    padding: 10,
    marginTop: 16,
    marginBottom: 16,
    color: "#BDBDBD",
  },
  inputText: {
    flex: 1,
  },
  sendGroup: {
    padding: 8,
  },
  sendIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  commentContainerEven: {
    flexDirection: "row-reverse",
    marginBottom: 24,
  },
  commentContainerOdd: {
    flexDirection: "row",
    marginBottom: 24,
  },
  imageContainerEven: {
    marginLeft: 16,
  },
  imageContainerOdd: {
    marginRight: 16,
  },
  textComment: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderRadius: 6,
  },
  textCommentLoginEven: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textCommentLoginOdd: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  textCommentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  textCommentDateEven: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  textCommentDateOdd: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  photoUser: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
});