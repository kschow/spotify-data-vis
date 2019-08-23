import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchControls = ({ search }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        search(searchText);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Search by artist"
                    value={searchText}
                    onChange={handleSearchTextChange} />
                <input type="submit" value="Search"/>
            </form>
        </div>
    );
};

SearchControls.propTypes = {
    search: PropTypes.func
};

export default SearchControls;
