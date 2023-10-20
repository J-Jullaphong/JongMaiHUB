import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchScreen = () => {
    const [searchQuery] = useSearchParams();
    const [searchResult, setSearchResult] = useState([]);

    if (!searchResult || searchResult.length === 0) {
        return <h1>SearchQuery = {searchQuery.get("name")}</h1>;
    }
};

export default SearchScreen;
