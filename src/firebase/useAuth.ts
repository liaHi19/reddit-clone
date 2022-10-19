import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./clientApp";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  const logOut = async () => {
    await signOut(auth);
  };
  return { user, loading, error, logOut };
};
