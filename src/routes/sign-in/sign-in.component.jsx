import React, { useEffect } from 'react';
import { signInWithGooglePopup, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const { user } = result;
          await createUserDocumentFromAuth(user);
        }
      } catch (error) {
        console.error("Error fetching redirect result", error);
      }
    };
    fetchRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
