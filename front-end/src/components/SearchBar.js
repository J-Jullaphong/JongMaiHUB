import React, { useState } from "react";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery !== "") {
      navigate("/search?name=" + searchQuery);
    }
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchQuery.trim() === "") {
        navigate("/search");
      } else {
        handleSearch();
      }
    }
  };

  return (
    <InputGroup inside style={{ width: "30vw" }} onKeyDown={handleKeyPress}>
      <AutoComplete onChange={handleSearchQueryChange} value={searchQuery} />
      <InputGroup.Button onClick={handleSearch}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>
  );
};

export default SearchBar;
