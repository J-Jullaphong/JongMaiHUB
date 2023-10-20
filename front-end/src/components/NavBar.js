import React, { Component } from "react";
import { Avatar, Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import SearchBar from "./SearchBar";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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
        if (!this.state.isAuthenticated) {
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
                            <Nav.Item>Barber</Nav.Item>
                            <Nav.Item>Beauty Clinic</Nav.Item>
                            <Nav.Item>Salon</Nav.Item>
                            <Nav.Item>Massage</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item>
                            <SearchBar />
                        </Nav.Item>
                        <Nav.Item
                            href="/login"
                            style={{
                                backgroundColor: "#F5D6CC",
                                color: "#F26030",
                            }}
                        >
                            Login
                        </Nav.Item>
                    </Nav>
                </Navbar>
            );
        }
        return (
            <Navbar appearance="subtle">
                <Nav>
                    <Nav.Item>
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
                        <Nav.Item>Barber</Nav.Item>
                        <Nav.Item>Beauty Clinic</Nav.Item>
                        <Nav.Item>Salon</Nav.Item>
                        <Nav.Item>Massage</Nav.Item>
                    </Nav.Menu>
                </Nav>
                <Nav pullRight>
                    <Nav.Item>
                        <SearchBar />
                    </Nav.Item>
                    <Nav.Item>{this.state.user.displayName}</Nav.Item>
                    <Nav.Menu
                        icon={<Avatar circle src={this.state.user.photoURL} />}
                    >
                        <Nav.Item>
                            <a onClick={() => firebase.auth().signOut()} style={{textDecoration: "none", color: "#F26030"}}>
                                Sign Out
                            </a>
                        </Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;
