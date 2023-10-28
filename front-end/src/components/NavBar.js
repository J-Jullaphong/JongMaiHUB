import React, { Component } from "react";
import { Avatar, Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import SearchBar from "./SearchBar";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const categoriesButtonStyle = {
    textDecoration: "none",
    color: "#575757",
};

class NavBar extends Component {
    state = {
        isAuthenticated: false,
        user: "",
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) =>
            this.setState({
                isAuthenticated: !!user,
                user: firebase.auth().currentUser,
            })
        );
    }

    render() {
        return (
            <Navbar appearance="subtle">
                <Nav>
                    <Nav.Item href="../../../">
                        <img
                            src="images/jongmaihub-logo.png"
                            alt="JongMaiHUB"
                            width="150"
                        />
                    </Nav.Item>
                    <Nav.Item icon={<HomeIcon />} href="../../../">
                        HUB
                    </Nav.Item>
                    <Nav.Menu title="Categories">
                        <Nav.Item>
                            <a
                                href="/search?type=barber"
                                style={categoriesButtonStyle}
                            >
                                Barber
                            </a>
                        </Nav.Item>
                        <Nav.Item>
                            <a
                                href="/search?type=beauty+clinic"
                                style={categoriesButtonStyle}
                            >
                                Beauty Clinic
                            </a>
                        </Nav.Item>
                        <Nav.Item>
                            <a
                                href="/search?type=salon"
                                style={categoriesButtonStyle}
                            >
                                Salon
                            </a>
                        </Nav.Item>
                        <Nav.Item>
                            <a
                                href="/search?type=massage"
                                style={categoriesButtonStyle}
                            >
                                Massage
                            </a>
                        </Nav.Item>
                    </Nav.Menu>
                </Nav>
                <Nav pullRight>
                    <Nav.Item title='searchbar'>
                        <SearchBar />
                    </Nav.Item>
                    {this.state.isAuthenticated ? (
                        <>
                            <Nav.Item title='username'>{this.state.user.displayName}</Nav.Item>
                            <Nav.Menu
                                icon={
                                    <Avatar title='userprofile'
                                        circle
                                        src={this.state.user.photoURL}
                                    />
                                }
                            >
                                <Nav.Item>
                                    <a
                                        href="../../../"
                                        onClick={() =>
                                            firebase.auth().signOut()
                                        }
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
    }
}

export default NavBar;