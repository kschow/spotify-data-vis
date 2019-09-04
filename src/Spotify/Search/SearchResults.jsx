import PropTypes from 'prop-types';
import React from 'react';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import { useSearch } from './Service/SearchContext';

const SearchResults = () => {
    const { searchType, searchResults } = useSearch();
    const { getTracks } = useTrackInfo();

    const getTracksInfo = (spotifyId) => {
        getTracks(spotifyId, searchType);
    };

    return (
        searchResults.isEmpty ?
            null :
            <div className="SearchResults">
                {
                    searchResults.map((result) => {
                        return <SearchResult
                            key={result.spotifyId}
                            spotifyId={result.spotifyId}
                            name={result.name}
                            imageUrls={result.imageUrls}
                            popularity={result.popularity}
                            getTracks={getTracksInfo}
                        />;
                    })
                }
            </div>
    );
};

const SearchResult = ({
    spotifyId,
    name,
    imageUrls,
    popularity,
    getTracks
}) => {
    const onClickHandler = () => {
        getTracks(spotifyId);
    };

    return (
        <div className="SearchResult" onClick={onClickHandler}>
            <div className="image-container">
                {
                    imageUrls.length > 0 ?
                        <img className="image" src={imageUrls[0]} alt={name}/> :
                        null
                }
            </div>
            <div className="data">
                <div>{name}</div>
                {
                    popularity ?
                        <div>Popularity: {popularity}</div> :
                        null
                }
            </div>
        </div>
    );
};

SearchResult.propTypes = {
    spotifyId: PropTypes.string,
    name: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    popularity: PropTypes.number,
    getTracks: PropTypes.func
};

export default SearchResults;
