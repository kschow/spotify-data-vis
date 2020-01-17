import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
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

const SearchAndVisualizationArea = ({ testId,
    deletePane,
    setHasTrackInfo,
    onePane,
    visualizationControls,
    searchContext,
    trackInfoContext }) => {
    // true means show search area, false means show visualization area
    const [searchAndVisualization, setSearchAndVisualization] = useState(true);
    const { tracks, isLoading } = trackInfoContext;
    const { isSearchBox, searchResults, goToSearch, goToResults } = searchContext;

    const toggleSearchAndVisualization = useCallback(() => {
        setSearchAndVisualization(!searchAndVisualization);
    }, [searchAndVisualization]);

    const toggleToSearch = useCallback(() => {
        toggleSearchAndVisualization();
        goToSearch();
    }, [toggleSearchAndVisualization, goToSearch]);

    const toggleToResults = useCallback(() => {
        toggleSearchAndVisualization();
        goToResults();
    }, [toggleSearchAndVisualization, goToResults]);

    useEffect(() => {
        if (Object.keys(tracks).length > 0) {
            setHasTrackInfo();
        }
    }, [setHasTrackInfo, tracks]);

    useEffect(
        () => {
            if (searchAndVisualization && isLoading) {
                toggleSearchAndVisualization();
            }
        },
        [
            searchAndVisualization,
            isLoading,
            toggleSearchAndVisualization
        ]
    );

    const displaySearchArea = () => {
        return (
            <div className="SearchArea">
                <SearchArea searchContext={searchContext} trackInfoContext={trackInfoContext} />
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
                            <button className="link-button" onClick={toggleSearchAndVisualization}>
                                Show visualization
                            </button>
                    }
                </div>
            </div>
        );
    };

    const displayVisualizationArea = () => {
        return (
            <div className="VisualizationArea">
                <VisualizationArea visualizationControls={visualizationControls} trackInfoContext={trackInfoContext} />
                <div className="Controls">
                    {
                        !isLoading &&
                            <>
                                <button className="link-button" onClick={toggleToSearch}>
                                    Go back to search
                                </button>
                                <button className="link-button" onClick={toggleToResults}>
                                    Show results
                                </button>
                            </>
                    }
                </div>
            </div>
        );
    };

    return (
        <>
            {
                searchAndVisualization ?
                    displaySearchArea() :
                    displayVisualizationArea()
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
};

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
