import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import auth from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./styles/LoginScreen.css";

const LoginScreen = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccess: () => false,
        },
    };

    const navigate = useNavigate();

    useEffect(() => {
        const AuthObserver = firebase.auth().onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
        });

        return () => {
            AuthObserver();
        };
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="container">
                <div className="title">
                    <h2>Log in</h2>
                </div>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        );
    }
    navigate("/");
};

export default LoginScreen;
