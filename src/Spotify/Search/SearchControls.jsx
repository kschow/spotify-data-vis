import React, { useState } from 'react';
import { useSearch } from './Service/SearchContext';

const SearchControls = () => {
    const [searchText, setSearchText] = useState('');

    const { searchType, setSearchType, search } = useSearch();

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        search(searchText, searchType);
    };

    return (
        <div className="SearchControls">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={searchText}
                    onChange={handleSearchTextChange} />
                <select
                    name="searchType"
                    value={searchType}
                    onChange={handleSearchTypeChange} >
                    <option value="artist">Artist</option>
                    <option value="playlist">Playlist</option>
                </select>
                <button>Search</button>
            </form>
        </div>
    );
};

export default SearchControls;
