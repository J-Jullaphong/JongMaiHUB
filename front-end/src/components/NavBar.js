import React, { useState, useEffect } from "react";
import { Avatar, Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import SearchBar from "./SearchBar";
import DataFetcher from "./DataFetcher";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const categoriesButtonStyle = {
    textDecoration: "none",
    color: "#575757",
};

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                setIsAuthenticated(true);
                setUser(authUser);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        const dataFetcher = new DataFetcher();
        dataFetcher.getServiceData().then((data) => {
            const uniqueServiceTypes = Array.from(new Set(data.map(service => service.type)));
            setServiceData(uniqueServiceTypes.map(type => ({ type })));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Navbar appearance="subtle">
            <Nav>
                <Nav.Item href="../../../">
                    <img src="images/jongmaihub-logo.png" alt="JongMaiHUB" width="150" />
                </Nav.Item>
                <Nav.Item icon={<HomeIcon />} href="../../../">
                    HUB
                </Nav.Item>
                <Nav.Menu title="Categories">
                    {serviceData.map((service) => (
                        <a href={`/search?type=${service.type}`} style={categoriesButtonStyle}>
                            <Nav.Item>{service.type}</Nav.Item>
                        </a>
                    ))}
                </Nav.Menu>
            </Nav>
            <Nav pullRight>
                <Nav.Item title="searchbar">
                    <SearchBar />
                </Nav.Item>
                {isAuthenticated ? (
                    <>
                        <Nav.Item title="username">{user.displayName}</Nav.Item>
                        <Nav.Menu
                            icon={<Avatar title="userprofile" circle src={user.photoURL} />}
                        >
                            <Nav.Item>
                                <a
                                    href="../../../"
                                    onClick={() => firebase.auth().signOut()}
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
                        href="/login"
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

