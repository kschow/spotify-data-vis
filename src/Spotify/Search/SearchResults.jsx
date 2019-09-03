import PropTypes from 'prop-types';
import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = ({ results, getTracks }) => {
    return (
        results.isEmpty ?
            null :
            <div className="SearchResults">
                {
                    results.map((result) => {
                        return <SearchResult
                            key={result.spotifyId}
                            spotifyId={result.spotifyId}
                            name={result.name}
                            imageUrls={result.imageUrls}
                            popularity={result.popularity}
                            getTracks={getTracks}
                        />;
                    })
                }
            </div>
    );
};

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
    getTracks: PropTypes.func
};

export default SearchResults;
