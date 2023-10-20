import React, { Component } from "react";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

class SearchBar extends Component {
    state = {
        searchQuery: "",
    };

    handleSearchChange = (value) => {
        this.setState({ searchQuery: value });
    };

    render() {
        return (
            <InputGroup inside style={{ width: "30vw" }}>
                <AutoComplete
                    onChange={this.handleSearchChange}
                    value={this.state.searchQuery}
                />
                <InputGroup.Button>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
        );
    }
}

export default SearchBar;
