import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../Common/Styles/Controls.scss';

class SearchControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };

        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleSearchTextChange(event) {
        this.setState({ searchText: event.target.value });
    }

    handleSearchTypeChange(event) {
        this.props.searchContext.setSearchType(event.target.value);
    }

    onSubmit(event) {
        event.preventDefault();
        const { searchType, search } = this.props.searchContext;
        search(this.state.searchText, searchType);
    }

    render() {
        const { searchType } = this.props.searchContext;

        return (
            <div className="SearchControls ControlBox">
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder={`Search by ${searchType}`}
                        value={this.state.searchText}
                        onChange={this.handleSearchTextChange} />
                    <select
                        name="searchType"
                        value={searchType}
                        onChange={this.handleSearchTypeChange} >
                        <option value="artist">Artist</option>
                        <option value="playlist">Playlist</option>
                    </select>
                    <button className="Button">Search</button>
                </form>
            </div>
        );
    }
}

SearchControls.propTypes = {
    searchContext: PropTypes.object
};

export default SearchControls;
