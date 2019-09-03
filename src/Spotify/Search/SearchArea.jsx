import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import './SearchArea.scss';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import SearchService from './SearchService';

const SearchArea = ({ getTracks }) => {
    const [searchType, setSearchType] = useState('artist');

    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchForX = (searchFunction, searchTerm) => {
        return searchFunction(searchTerm)
            .then((response) => setSearchResults(response))
            .catch(() => setErrorMessage('Spotify search failed.'))
            .finally(() => setIsLoading(false));
    };

    const search = (searchTerm, type) => {
        if (searchTerm === '') {
            setErrorMessage('Please specify your search.');
            return;
        }

        setErrorMessage('');
        setIsLoading(true);
        setSearchResults([]);

        if (type === 'artist') {
            searchForX(SearchService.searchArtist, searchTerm);
        } else if (type === 'playlist') {
            searchForX(SearchService.searchPlaylist, searchTerm);
        }
    };

    const getTrackInfo = (spotifyId) => {
        getTracks(spotifyId, searchType);
    };

    return (
        <div>
            <SearchControls
                searchType={searchType}
                setSearchType={setSearchType}
                search={search} />
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
            <SearchResults
                results={searchResults}
                getTracks={getTrackInfo} />
        </div>);
};

SearchArea.propTypes = {
    getTracks: PropTypes.func
};

export default SearchArea;
