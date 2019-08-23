import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';

const SearchResults = ({ results }) => {
    return (
        <ul>
            {
                results.map((result) => {
                    return <SearchResult
                        key={result.spotifyId}
                        spotifyId={result.spotifyId}
                        name={result.name}
                    />;
                })
            }
        </ul>
    );
};

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResults;
