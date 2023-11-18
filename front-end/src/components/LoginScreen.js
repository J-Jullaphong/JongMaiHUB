import React from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./styles/LoginScreen.css";
import LineAuth from "./LineAuth";
import { Button } from "rsuite";

const LoginScreen = () => {
  const navigate = useNavigate();

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  const randomState = (length) => {
    return Math.round(
      Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
    )
      .toString(36)
      .slice(1);
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Log in</h2>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <LineAuth
        clientID={process.env.REACT_APP_LINE_CLIENT_ID}
        state={randomState(12)}
        scope="profile%20openid"
        redirectURI={process.env.REACT_APP_LINE_REDIRECT_URI}
      />
      <div className="button-container">
        <Button
          className="guest-button"
          appearance="primary"
          onClick={() => navigate("/")}
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
