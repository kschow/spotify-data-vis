import React, { useState } from 'react';
import '../../Common/Styles/Controls.scss';
import PropTypes from 'prop-types';

const SearchControls = ({ searchContext }) => {
    const [searchText, setSearchText] = useState('');

    const { searchType, setSearchType, search } = searchContext;

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
        <div className="SearchControls ControlBox">
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
                <button className="Button">Search</button>
            </form>
        </div>
    );
};

SearchControls.propTypes = {
    searchContext: PropTypes.object
};

export default SearchControls;
