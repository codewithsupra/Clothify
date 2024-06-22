import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

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
const db =getFirestore();
export const createUserDocumentFromAuth=async (userAuth)=>{
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const{displayName,email}=userAuth;
        const createdAt=new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt

            })

        }
        catch(error){
            console.log('error creating the error',error)

        }

    }
    
    


};

