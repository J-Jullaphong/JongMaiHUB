import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import "firebase/compat/auth";
import { Routes, Route } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="app-header">
                    <Routes>
                        <Route path="/login" element={<LoginScreen />} />
                    </Routes>
                </header>
            </div>
        );
    }
}

export default App;
