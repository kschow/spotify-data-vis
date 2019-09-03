import PropTypes from 'prop-types';
import React from 'react';

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
export default SearchResult;
