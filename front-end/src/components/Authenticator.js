import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { jwtDecode } from "jwt-decode";
import "firebase/compat/auth";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";
import LoginScreen from "./LoginScreen";

const Authenticator = ({ user, onAuthenticationChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dataFetcher = new DataFetcher();
  const dataSender = new DataSender();
  const navigate = useNavigate();

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        setUserData(
          authUser.uid,
          authUser.displayName,
          authUser.photoURL,
          authUser.email
        );
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
          redirect_uri: process.env.REACT_APP_LINE_REDIRECT_URI,
          client_id: process.env.REACT_APP_LINE_CLIENT_ID,
          client_secret: process.env.REACT_APP_LINE_CLIENT_SECRET,
        };

        const requestConfig = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        try {
          const response = await axios.post(
            process.env.REACT_APP_LINE_AUTH_API_URL,
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

  const setUserData = async (uid, userName, profilePic, email = null) => {
    const customerData = await dataFetcher.getCustomerData();
    const fetchedCustomer = customerData.find(
      (customer) => customer.uid === uid
    );
    if (!fetchedCustomer) {
      const formData = { uid: uid, name: userName, email: email };
      dataSender.submitCustomerData(formData);
      user.setName(userName);
    } else {
      user.setName(fetchedCustomer.name);
      if (!fetchedCustomer.email) {
        dataSender.updateCustomerData({ email: email }, uid);
      }
    }
    user.setUID(uid);
    user.setProfilePicture(profilePic);
    user.setIsProvider(checkProviderStatus());
    user.setIsStaff(checkStaffStatus());
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

  return <div>{isAuthenticated ? navigate("/") : <LoginScreen />}</div>;
};

export default Authenticator;
