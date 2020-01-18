import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchArea from '../Spotify/Search/SearchArea';
import { withSearch } from '../Spotify/Search/Service/SearchContext';
import { withTrackInfo } from '../Spotify/TrackInfo/TrackInfoContext';
import VisualizationArea from '../Spotify/Visualization/VisualizationArea';
import './Pane.scss';

const paneIndexCss = (index, numPanes) => {
    if (numPanes === 1) {
        return ' OnePane';
    }

    if (index === 0) {
        return ' One';
    } else if (index === 1) {
        return ' Two';
    } else if (index === 2) {
        return ' Three';
    } else if (index === 3) {
        return ' Four';
    }
    return null;
};

const Pane = ({ testId, deletePane, setHasTrackInfo, numPanes, index, visualizationControls }) => {
    const onePane = numPanes === 1;

    return (
        <div className={`Pane${paneIndexCss(index, numPanes)}`} data-testid={testId}>
            <SearchAndTrackInfoWrappedArea
                testId={testId}
                deletePane={deletePane}
                setHasTrackInfo={setHasTrackInfo}
                onePane={onePane}
                visualizationControls={visualizationControls}
            />
        </div>
    );
};

Pane.propTypes = {
    testId: PropTypes.number,
    deletePane: PropTypes.func,
    setHasTrackInfo: PropTypes.func,
    numPanes: PropTypes.number,
    index: PropTypes.number,
    visualizationControls: PropTypes.object
};

class SearchAndVisualizationArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // true means show search area, false means show visualization area
            searchAndVisualization: true
        };

        this.toggleSearchAndVisualization.bind(this);
        this.toggleToSearch.bind(this);
        this.toggleToResults.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { tracks: prevTracks, isLoading: prevIsLoading } = prevProps.trackInfoContext;
        const { tracks, isLoading } = this.props.trackInfoContext;

        if (prevTracks !== tracks && Object.keys(tracks).length > 0) {
            this.props.setHasTrackInfo();
        }

        if (isLoading !== prevIsLoading) {
            if (this.state.searchAndVisualization && isLoading) {
                this.toggleSearchAndVisualization();
            }
        }
    }

    toggleSearchAndVisualization() {
        this.setState({
            searchAndVisualization: !this.state.searchAndVisualization
        });
    }

    toggleToSearch() {
        this.toggleSearchAndVisualization();
        this.props.searchContext.goToSearch();
    }

    toggleToResults() {
        this.toggleSearchAndVisualization();
        this.props.searchContext.goToResults();
    }

    displaySearchArea() {
        const { isSearchBox, searchResults, goToSearch, goToResults } = this.props.searchContext;
        const { tracks } = this.props.trackInfoContext;

        return (
            <div className="SearchArea">
                <SearchArea searchContext={this.props.searchContext} trackInfoContext={this.props.trackInfoContext} />
                <div className="Controls">
                    {
                        isSearchBox && !isEmpty(searchResults) &&
                            <button className="link-button" onClick={goToResults}>
                                Show results
                            </button>
                    }
                    {
                        !isSearchBox &&
                            <button className="link-button" onClick={goToSearch}>
                                Go back to search
                            </button>
                    }
                    {
                        !isEmpty(tracks) &&
                            <button className="link-button" onClick={() => this.toggleSearchAndVisualization()}>
                                Show visualization
                            </button>
                    }
                </div>
            </div>
        );
    }

    displayVisualizationArea() {
        const { isLoading } = this.props.trackInfoContext;
        return (
            <div className="VisualizationArea">
                <VisualizationArea
                    visualizationControls={this.props.visualizationControls}
                    trackInfoContext={this.props.trackInfoContext}
                />
                <div className="Controls">
                    {
                        !isLoading &&
                            <>
                                <button className="link-button" onClick={() => this.toggleToSearch()}>
                                    Go back to search
                                </button>
                                <button className="link-button" onClick={() => this.toggleToResults()}>
                                    Show results
                                </button>
                            </>
                    }
                </div>
            </div>
        );
    }

    render() {
        const { onePane, deletePane, testId, trackInfoContext } = this.props;
        const { isLoading } = trackInfoContext;

        return (
            <>
                {
                    this.state.searchAndVisualization ?
                        this.displaySearchArea() :
                        this.displayVisualizationArea()
                }
                {
                    isLoading || onePane ?
                        null :
                        <button
                            className="DeleteButton"
                            onClick={deletePane}
                            title="Delete"
                            data-testid={`delete-${testId}`}>
                            X
                        </button>
                }
            </>
        );
    }
}

SearchAndVisualizationArea.propTypes = {
    testId: PropTypes.number,
    deletePane: PropTypes.func,
    setHasTrackInfo: PropTypes.func,
    onePane: PropTypes.bool,
    visualizationControls: PropTypes.object,
    searchContext: PropTypes.object,
    trackInfoContext: PropTypes.object
};

// only exported for test
const SearchAndTrackInfoWrappedArea = withTrackInfo(withSearch(SearchAndVisualizationArea));

export { Pane, SearchAndTrackInfoWrappedArea };
