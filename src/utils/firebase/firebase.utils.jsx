import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnMbvKhlDRzxCtE5ip441BhJEYtiteUqM",
  authDomain: "crwn-clothing-db-34cee.firebaseapp.com",
  projectId: "crwn-clothing-db-34cee",
  storageBucket: "crwn-clothing-db-34cee.appspot.com",
  messagingSenderId: "187377429860",
  appId: "1:187377429860:web:b55f0f2811ec73ba71de71"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating the user', error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword=async (email,password)=>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
}
export const signInAuthUserWithEmailAndPassword=async (email,password)=>{
    if(!email || !password) return;
    return await  signInWithEmailAndPassword(auth,email,password)
}
export const signOutUser= async ()=>{
      return await signOut(auth);
}
export const onAuthStateChangedListener=(callback)=>{
 onAuthStateChanged(auth,callback);
}