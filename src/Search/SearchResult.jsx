import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({ name }) => {
    return (
        <li>
            {name}
        </li>
    );
};

SearchResult.propTypes = {
    name: PropTypes.string
};
export default SearchResult;
