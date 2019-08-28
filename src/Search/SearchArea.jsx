import React, { useState } from 'react';
import './SearchArea.scss';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import SearchService from './SearchService';

const SearchArea = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchForX = (searchFunction, searchTerm) => {
        return searchFunction(searchTerm)
            .then((response) => setSearchResults(response))
            .catch(() => setErrorMessage('Spotify search failed.'));
    };

    const search = (searchTerm, searchType) => {
        if (searchTerm === '') {
            setErrorMessage('Please specify your search.');
            return;
        }

        setErrorMessage('');

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
            <SearchResults results={searchResults}/>
        </div>);
};

export default SearchArea;
