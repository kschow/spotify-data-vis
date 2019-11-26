import React from 'react';
import Loading from '../../Common/Loading/Loading';
import './SearchArea.scss';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';
import { useSearch } from './Service/SearchContext';

const SearchArea = () => {
    const { errorMessage, isLoading } = useSearch();

    return (
        <>
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
            <SearchResults />
        </>
    );
};

export default SearchArea;
