import { auth } from "../../firebase/config";
import { authSlice } from "../auth/authReducer";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";

const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error){
        console.log(error);
        console.log("error.mesage", error.message);
    }
};

const authSignUpUser = ({email, password, login}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        await updateProfile(user, {
            displayName: login,
        });
        const updateUserSuccess = auth.currentUser;
        dispatch(
            authSlice.actions.updateUserProfile({
                userId: updateUserSuccess.uid,
                login: updateUserSuccess.displayName,
        }))
    }
    catch(error){
        console.log(error);
        console.log("error.mesage", error.message);
    }
};

const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authLogOut());
  } catch (error) {
    console.log(error);
    console.log("error.mesage", error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  };


export {authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser};