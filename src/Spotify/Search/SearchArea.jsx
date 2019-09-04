import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../Common/Loading/Loading';
import './SearchArea.scss';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import { useSearch } from './Service/SearchContext';

const SearchArea = ({ getTracks }) => {
    const { searchType, errorMessage, isLoading } = useSearch();

    const getTrackInfo = (spotifyId) => {
        getTracks(spotifyId, searchType);
    };

    return (
        <div>
            <SearchControls />
            {
                errorMessage === '' ?
                    null :
                    <div className="error"><strong>{errorMessage}</strong></div>
            }
            {
                isLoading ?
                    <Loading /> :
                    null
            }
            <SearchResults getTracks={getTrackInfo} />
        </div>
    );
};

SearchArea.propTypes = {
    getTracks: PropTypes.func
};

export default SearchArea;
