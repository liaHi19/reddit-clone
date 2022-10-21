import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
    const { email, password, firstName, lastName } = data;
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile({ displayName: `${firstName} ${lastName}` });

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
  return {
    user,
    loading,
    error,
    logOut,
    createUser,
    logIn,
    resetPasswordEmail,
    signInWithGoogle,
  };
};
