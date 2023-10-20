import React, { Component } from "react";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

class SearchBar extends Component {
    render() {
        return (
            <InputGroup inside style={{ width: "30vw" }}>
                <AutoComplete />
                <InputGroup.Addon>
                    <SearchIcon />
                </InputGroup.Addon>
            </InputGroup>
        );
    }
}

export default SearchBar;
