import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./styles/LoginScreen.css";
import LineAuth from "./LineAuth";

const LINE_CLIENT_ID = "<% CLIENT-ID %>"

const LoginScreen = () => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  const randomState = (length) => {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

  return (
    <div className="container">
      <div className="title">
        <h2>Log in</h2>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <LineAuth
        clientID={LINE_CLIENT_ID}
        state={randomState(12)}
        scope="profile%20openid"
        redirectURI="http://localhost:3000/login/"
      />
    </div>
  );
};

export default LoginScreen;
