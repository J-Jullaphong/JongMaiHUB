import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import axios from "axios";
import qs from "qs";
import { jwtDecode } from "jwt-decode";
import "firebase/compat/auth";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";
import LoginScreen from "./LoginScreen";

const LINE_CLIENT_ID = "<% CLIENT-ID %>"
const LINE_CLIENT_SECRET = "<% CLIENT-SECRET %>";

const Authenticator = ({ user, onAuthenticationChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dataFetcher = new DataFetcher();
  const dataSender = new DataSender();

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        setUserData(authUser.uid, authUser.displayName, authUser.photoURL);
        onAuthenticationChange(true);
      } else if (user.getName() !== null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        onAuthenticationChange(false);
      }
    });
    return () => {
      authObserver();
    };
  }, []);

  useEffect(() => {
    const fetchLineToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (user.getName() !== null) {
        return null;
      }
      if (code) {
        const requestBody = {
          grant_type: "authorization_code",
          code,
          redirect_uri: "http://localhost:3000/login/",
          client_id: LINE_CLIENT_ID,
          client_secret: LINE_CLIENT_SECRET,
        };

        const requestConfig = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        try {
          const response = await axios.post(
            "https://api.line.me/oauth2/v2.1/token",
            qs.stringify(requestBody),
            requestConfig
          );
          const lineToken = response.data.id_token;
          console.log("Line Token:", lineToken);
          setIsAuthenticated(true);
          setUserData(
            jwtDecode(lineToken).sub,
            jwtDecode(lineToken).name,
            jwtDecode(lineToken).picture
          );
          onAuthenticationChange(true);
        } catch (error) {
          console.error("Error while fetching Line token:", error);
          onAuthenticationChange(false);
        }
      }
    };
    fetchLineToken();
  }, []);

  const setUserData = (uid, userName, profilePic) => {
    console.log("Setting user info:", uid, userName, profilePic);
    user.setUID(uid);
    user.setName(userName);
    user.setProfilePicture(profilePic);
    user.setIsProvider(checkProviderStatus());
    user.setIsStaff(checkStaffStatus());
    console.log(
      "User info after setting:",
      user.getUID(),
      user.getName(),
      user.getProfilePicture()
    );
    addCurrentUser(user);
  };

  const addCurrentUser = async (user) => {
    try {
      await dataFetcher.getCustomerData(user.getUID());
    } catch (AxiosError) {
      const formData = { uid: user.getUID(), name: user.getName() };
      dataSender.submitCustomerData(formData);
    }
  };

  const checkProviderStatus = async () => {
    try {
      await dataFetcher.getServiceProviderData(user.getUID());
      return true;
    } catch (AxiosError) {
      return false;
    }
  };

  const checkStaffStatus = async () => {
    try {
      await dataFetcher.getStaffData(user.getUID());
      return true;
    } catch (AxiosError) {
      return false;
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <h1>{user.getName()} is authenticated!</h1>
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};

export default Authenticator;
