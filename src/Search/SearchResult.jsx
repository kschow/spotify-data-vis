import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({ name, imageUrls, popularity }) => {
    return (
        <div className="SearchResult">
            <div className="image-container">
                {
                    imageUrls.length > 0 ?
                        <img className="image" src={imageUrls[0]} alt={name}/> :
                        null
                }
            </div>
            <div className="data">
                <div>{name}</div>
                <div>Popularity: {popularity}</div>
            </div>
        </div>
    );
};

SearchResult.propTypes = {
    name: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    popularity: PropTypes.number
};
export default SearchResult;
