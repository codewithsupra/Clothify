import React from 'react';
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const {user} = await signInWithGooglePopup();
      const userDocRef=await createUserDocumentFromAuth(user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
