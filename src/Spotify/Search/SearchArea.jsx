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
            {
                isSearchBox ?
                    <SearchControls /> :
                    null
            }
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
            {
                isSearchBox ?
                    null :
                    <SearchResults />
            }
        </>
    );
};

export default SearchArea;
