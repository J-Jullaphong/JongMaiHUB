import React, { useState, useEffect } from "react";
import { Avatar, Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import SearchBar from "./SearchBar";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";

const categoriesButtonStyle = {
  textDecoration: "none",
  color: "#575757",
};

const NavBar = ({ user, isUserAuthenticated, serviceData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated);
  const uniqueServiceTypes = Array.from(
    new Set(serviceData.map((service) => service.type))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleUserChange = () => {
      setIsAuthenticated(user.getName() !== null);
    };

    user.addListener(handleUserChange);

    return () => {
      user.removeListener(handleUserChange);
    };
  }, [user]);

  const handleSignOut = () => {
    firebase.auth().signOut();
    user.signOut();
  };

  return (
    <Navbar appearance="subtle">
      <Nav>
        <Nav.Item onClick={() => navigate("/")}>
          <img src="images/jongmaihub-logo.png" alt="JongMaiHUB" width="150" />
        </Nav.Item>
        <Nav.Item icon={<HomeIcon />} onClick={() => navigate("/")}>
          HUB
        </Nav.Item>
        <Nav.Menu title="Categories">
          {uniqueServiceTypes.map((service) => (
            <Nav.Item key={service}>
              <a
                onClick={() => navigate(`/search?type=${service}`)}
                style={categoriesButtonStyle}
              >
                {service}
              </a>
            </Nav.Item>
          ))}
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item title="searchbar">
          <SearchBar />
        </Nav.Item>
        {isAuthenticated ? (
          <>
            <Nav.Item title="username">{user.getName()}</Nav.Item>
            <Nav.Menu
              icon={
                <Avatar
                  title="userprofile"
                  circle
                  src={user.getProfilePicture()}
                />
              }
            >
              <Nav.Item>
                <a
                  onClick={() => {
                    handleSignOut();
                    navigate("/");
                  }}
                  style={{
                    textDecoration: "none",
                    color: "#F26030",
                  }}
                >
                  Sign Out
                </a>
              </Nav.Item>
              <Nav.Item>
                <a
                  onClick={() => {
                    navigate("/my-appointment");
                  }}
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                  }}
                >
                  My appointment
                </a>
              </Nav.Item>
            </Nav.Menu>
          </>
        ) : (
          <Nav.Item
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#F5D6CC",
              color: "#F26030",
            }}
          >
            Login
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
