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
  const [uid, setUid] = useState("");
  const [userName, setUserName] = useState(user.getName());
  const [isProvider, setIsProvider] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleUserChange = async () => {
      setIsAuthenticated(user.getName() !== null);
      const IsProviderStatus = await user.isProvider;
      const IsStaffStatus = await user.isStaff;
      const UidStatus = await user.uid;
      const username = await user.name;
      setIsProvider(IsProviderStatus);
      setIsStaff(IsStaffStatus);
      setUid(UidStatus);
      setUserName(username);
    };

    user.addListener(handleUserChange);

    return () => {
      user.removeListener(handleUserChange);
    };
  }, [user]);

  const handleSignOut = () => {
    firebase.auth().signOut();
    user.signOut();
    navigate("/");
  };

  return (
    <Navbar appearance="subtle">
      <Nav>
        <Nav.Item onClick={() => navigate("/")}>
          <img
            src="https://i.imgur.com/5Lk5ucD.png"
            alt="JongMaiHUB"
            width="150"
          />
        </Nav.Item>
        <Nav.Item icon={<HomeIcon />} onClick={() => navigate("/")}>
          HUB
        </Nav.Item>
        <Nav.Menu title="Categories">
          {uniqueServiceTypes.map((service) => (
            <Nav.Item
              key={service}
              onClick={() => navigate(`/search?type=${service}`)}
            >
              <a style={categoriesButtonStyle}>{service}</a>
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
            <Nav.Menu
              icon={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    title="userprofile"
                    circle
                    src={user.getProfilePicture()}
                  />
                  <div style={{ paddingLeft: "10px" }}>{user.getName()}</div>
                </div>
              }
            >
              <Nav.Item
                onClick={() => {
                  navigate("/my-profile");
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                  }}
                >
                  My Profile
                </a>
              </Nav.Item>
              <Nav.Item
                onClick={() => {
                  navigate("/my-appointment");
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                  }}
                >
                  My Appointments
                </a>
              </Nav.Item>
              {isProvider ? (
                <>
                  <Nav.Item
                    onClick={() => {
                      navigate("/provider-management");
                    }}
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: "#000000",
                      }}
                    >
                      Provider Management
                    </a>
                  </Nav.Item>
                  <Nav.Item
                    onClick={() => {
                      navigate(`/appointment-provider/${uid}`);
                    }}
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: "#000000",
                      }}
                    >
                      Provider Appointment
                    </a>
                  </Nav.Item>
                </>
              ) : isStaff ? (
                <Nav.Item
                  onClick={() => {
                    navigate(`/appointment-staff/${uid}`);
                  }}
                >
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                    }}
                  >
                    Staff appointment
                  </a>
                </Nav.Item>
              ) : null}
              <Nav.Item onClick={handleSignOut}>
                <a
                  style={{
                    textDecoration: "none",
                    color: "#F26030",
                  }}
                >
                  Sign Out
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
