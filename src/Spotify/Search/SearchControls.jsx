import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../Common/Styles/Controls.scss';

class SearchControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };

        this.handleSearchTextChange.bind(this);
        this.handleSearchTypeChange.bind(this);
        this.onSubmit.bind(this);
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
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <input
                        type="text"
                        placeholder={`Search by ${searchType}`}
                        value={this.state.searchText}
                        onChange={(event) => this.handleSearchTextChange(event)} />
                    <select
                        name="searchType"
                        value={searchType}
                        onChange={(event) => this.handleSearchTypeChange(event)} >
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
