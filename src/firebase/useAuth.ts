import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export interface IProfile {
  displayName?: string | null;
  photoURL?: string | null;
}

import {
  useAuthState,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { IAUthInput } from "../components/Modal/Auth/Auth.interface";
import { auth } from "./clientApp";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const createUser = async (data: IAUthInput) => {
    const { email, password } = data;
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCred.user;
  };

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const resetPasswordEmail = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const changeProfile = async (profile: IProfile) => {
    await updateProfile({
      displayName: profile?.displayName,
      photoURL: profile?.photoURL,
    });
  };

  return {
    user,
    loading,
    error,
    logOut,
    createUser,
    logIn,
    resetPasswordEmail,
    signInWithGoogle,
    changeProfile,
  };
};
