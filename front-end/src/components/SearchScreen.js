import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";

const SearchScreen = () => {
    const [searchQuery] = useSearchParams();
    const [searchResult] = useState([]);

    if (!searchResult || searchResult.length === 0) {
        return (
            <div style={{display: "flex"}}>
                <div style={{width: "25%"}}>
                <Filter />
                </div>
                <h1>SearchQuery = {searchQuery.get("name")}</h1>
                
            </div>
        );
    }
};

export default SearchScreen;
