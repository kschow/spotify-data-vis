import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import './SearchResults.scss';

const SearchResults = ({ results }) => {
    return (
        <div className="SearchResults">
            {
                results.map((result) => {
                    return <SearchResult
                        key={result.spotifyId}
                        spotifyId={result.spotifyId}
                        name={result.name}
                        imageUrls={result.imageUrls}
                        popularity={result.popularity}
                    />;
                })
            }
        </div>
    );
};

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResults;
