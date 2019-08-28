import React, { useState } from 'react';
import './SearchArea.scss';
import Loading from '../Common/Loading/Loading';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import SearchService from './SearchService';

const SearchArea = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchForX = (searchFunction, searchTerm) => {
        return searchFunction(searchTerm)
            .then((response) => setSearchResults(response))
            .catch(() => setErrorMessage('Spotify search failed.'))
            .finally(() => setIsLoading(false));
    };

    const search = (searchTerm, searchType) => {
        if (searchTerm === '') {
            setErrorMessage('Please specify your search.');
            return;
        }

        setErrorMessage('');
        setIsLoading(true);
        setSearchResults([]);

        if (searchType === 'artist') {
            searchForX(SearchService.searchArtist, searchTerm);
        } else if (searchType === 'playlist') {
            searchForX(SearchService.searchPlaylist, searchTerm);
        }
    };

    return (
        <div>
            <SearchControls search={search}/>
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
            <SearchResults results={searchResults}/>
        </div>);
};

export default SearchArea;
