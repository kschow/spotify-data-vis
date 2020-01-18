import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { SearchService } from './SearchService';

const withSearch = (WrappedComponent) => {
    return class SearchWrapper extends Component {
        constructor(props) {
            super(props);

            this.state = {
                searchType: 'artist',
                searchResults: [],
                errorMessage: '',
                isLoading: false,
                isSearchBox: true
            };

            this.searchForX.bind(this);
            this.search.bind(this);
            this.goToSearch.bind(this);
            this.goToResults.bind(this);
        }

        searchForX(searchFunction, searchTerm) {
            return searchFunction(searchTerm)
                .then((response) => this.setState({ searchResults: response }))
                .catch(() => this.setState({ errorMessage: 'Spotify search failed.' }))
                .finally(() => this.setState({ isLoading: false }));
        }

        search(searchTerm) {
            if (searchTerm === '') {
                this.setState({ errorMessage: 'Please specify your search.' });
                return;
            }

            this.setState({
                errorMessage: '',
                isLoading: true,
                searchResults: [],
                isSearchBox: false
            });

            if (this.state.searchType === 'artist') {
                this.searchForX(SearchService.searchArtist, searchTerm);
            } else if (this.state.searchType === 'playlist') {
                this.searchForX(SearchService.searchPlaylist, searchTerm);
            }
        }

        goToSearch() {
            this.setState({ isSearchBox: true });
        }

        goToResults() {
            if (!isEmpty(this.state.searchResults)) {
                this.setState({ isSearchBox: false });
            }
        }

        render() {
            return (
                <WrappedComponent searchContext={{
                    searchType: this.state.searchType,
                    searchResults: this.state.searchResults,
                    errorMessage: this.state.errorMessage,
                    isLoading: this.state.isLoading,
                    isSearchBox: this.state.isSearchBox,
                    setSearchType: (searchType) => this.setState({ searchType }),
                    search: (searchTerm) => this.search(searchTerm),
                    goToSearch: () => this.goToSearch(),
                    goToResults: () => this.goToResults()
                }} {...this.props} />
            );
        }
    };
};

export { withSearch };
