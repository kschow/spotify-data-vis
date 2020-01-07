import React from 'react';
import Loading from '../../Common/Loading/Loading';
import './SearchArea.scss';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import { useSearch } from './Service/SearchContext';

const SearchArea = () => {
    const { errorMessage, isSearchBox, isLoading } = useSearch();

    return (
        <>
            { isSearchBox && <SearchControls /> }
            { errorMessage !== '' && <div className="error"><strong>{errorMessage}</strong></div> }
            { isLoading && <Loading /> }
            { !isSearchBox && <SearchResults /> }
        </>
    );
};

export default SearchArea;
