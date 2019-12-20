/* eslint-disable no-undefined */
import { isEmpty } from 'lodash';
import React, { createContext, useContext, useState } from 'react';
import { SearchService } from './SearchService';

const SearchContext = createContext(undefined);

const SearchProvider = (props) => {
    const [searchType, setSearchType] = useState('artist');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchBox, setIsSearchBox] = useState(true);

    const searchForX = (searchFunction, searchTerm) => {
        return searchFunction(searchTerm)
            .then((response) => setSearchResults(response))
            .catch(() => setErrorMessage('Spotify search failed.'))
            .finally(() => setIsLoading(false));
    };

    const search = (searchTerm) => {
        if (searchTerm === '') {
            setErrorMessage('Please specify your search.');
            return;
        }

        setErrorMessage('');
        setIsLoading(true);
        setSearchResults([]);
        setIsSearchBox(false);

        if (searchType === 'artist') {
            searchForX(SearchService.searchArtist, searchTerm);
        } else if (searchType === 'playlist') {
            searchForX(SearchService.searchPlaylist, searchTerm);
        }
    };

    const goToSearch = () => {
        setIsSearchBox(true);
    };

    const goToResults = () => {
        if (!isEmpty(searchResults)) {
            setIsSearchBox(false);
        }
    };

    return <SearchContext.Provider value={
        {
            searchType,
            searchResults,
            errorMessage,
            isLoading,
            setSearchType,
            isSearchBox,
            search,
            goToSearch,
            goToResults
        }
    } {...props} />;
};

const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

export { SearchProvider, useSearch };
