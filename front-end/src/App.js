import React, { Component } from "react";
import "./App.css";
import HubScreen from "./components/HubScreen";
import NavBar from "./components/NavBar";
import LoginScreen from "./components/LoginScreen";
import "firebase/compat/auth";
import { Routes, Route } from "react-router-dom";
import SearchScreen from "./components/SearchScreen";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="app-header">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HubScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/search" element={<SearchScreen />} />
                    </Routes>
                </header>
            </div>
        );
    }
}

export default App;
