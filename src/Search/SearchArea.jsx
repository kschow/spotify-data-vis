import React, { useState } from 'react';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import SearchService from './SearchService';

const SearchArea = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const search = (searchTerm) => {
        if (searchTerm === '') {
            setErrorMessage('Please specify your search.');
            return;
        }

        setErrorMessage('');
        SearchService.searchArtist(searchTerm)
            .then((response) => setSearchResults(response))
            .catch(() => setErrorMessage('Search Spotify failed.'));
    };

    return (
        <div>
            <SearchControls search={search}/>
            {
                errorMessage === '' ?
                    null :
                    <div>{errorMessage}</div>
            }
            <SearchResults results={searchResults}/>
        </div>);
};

export default SearchArea;
