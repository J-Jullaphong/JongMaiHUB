import React, { Component } from "react";
import { Avatar, Navbar, Nav, AutoComplete, InputGroup } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import SearchIcon from "@rsuite/icons/Search";
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

    searchBar = (
        <InputGroup inside style={{ width: "30vw" }}>
            <AutoComplete />
            <InputGroup.Addon>
                <SearchIcon />
            </InputGroup.Addon>
        </InputGroup>
    );

    render() {
        if (!this.state.isAuthenticated) {
            return (
                <Navbar appearance="subtle">
                    <Nav>
                        <Nav.Item href="../../../">
                            <img src="images/jongmaihub-logo.png" width="150" />
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
                        <Nav.Item>{this.searchBar}</Nav.Item>
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
                        <img src="images/jongmaihub-logo.png" width="150" />
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
                    <Nav.Item>{this.searchBar}</Nav.Item>
                    <Nav.Item>{this.state.user.displayName}</Nav.Item>
                    <Nav.Menu
                        icon={<Avatar circle src={this.state.user.photoURL} />}
                    >
                        <Nav.Item>
                            <a onClick={() => firebase.auth().signOut()}>
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
