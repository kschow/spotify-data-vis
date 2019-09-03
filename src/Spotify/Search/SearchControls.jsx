import PropTypes from 'prop-types';
import React, { useState } from 'react';

const SearchControls = ({ searchType, setSearchType, search }) => {
    const [searchText, setSearchText] = useState('');

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
    searchType: PropTypes.string,
    setSearchType: PropTypes.func,
    search: PropTypes.func
};

export default SearchControls;
