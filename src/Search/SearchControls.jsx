import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchControls = ({ search }) => {
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('artist');

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

SearchControls.propTypes = {
    search: PropTypes.func
};

export default SearchControls;
