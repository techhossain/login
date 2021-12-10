import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react"
import initAuthentication from "../../firebase/firebase.init";

initAuthentication();

const useFirebase = () => {

  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const auth = getAuth();
  // Google Login
  const googleSignIn = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  // GitHub Login
  const gitHubSignIn = () => {
    setIsLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  }

  // Registration with the email & Password
  const formRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  // Login with the email & Password
  const formLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // Firebase state change schedulers
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)

      } else {
        setUser({})
      }
      setIsLoading(false);
    });
  }, []);

  // Login out
  const logOut = () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      console.log('success');
      setUser({});
    }).catch((error) => {
      console.log(error.message)
    }).finally(() => { setIsLoading(false) });
  }



  return { googleSignIn, user, setUser, error, setError, logOut, formRegister, formLogin, isLoading, setIsLoading, gitHubSignIn }

}

export default useFirebase;
