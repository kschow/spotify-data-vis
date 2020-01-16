import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../Common/Loading/Loading';
import './SearchArea.scss';
import SearchControls from './SearchControls';
import SearchResults from './SearchResults';

const SearchArea = ({ searchContext }) => {
    const { errorMessage, isSearchBox, isLoading } = searchContext;

    return (
        <>
            { isSearchBox && <SearchControls searchContext={searchContext} /> }
            { errorMessage !== '' && <div className="error"><strong>{errorMessage}</strong></div> }
            { isLoading && <Loading /> }
            { !isSearchBox && <SearchResults searchContext={searchContext} /> }
        </>
    );
};

SearchArea.propTypes = {
    searchContext: PropTypes.object
};

export default SearchArea;
