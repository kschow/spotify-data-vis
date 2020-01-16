import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import SearchArea from '../Spotify/Search/SearchArea';
import { withSearch } from '../Spotify/Search/Service/SearchContext';
import { TrackInfoProvider, useTrackInfo } from '../Spotify/TrackInfo/TrackInfoContext';
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

    const SearchWrappedSvArea = withSearch(SearchAndVisualizationArea);

    return (
        <div className={`Pane${paneIndexCss(index, numPanes)}`} data-testid={testId}>
            <TrackInfoProvider>
                <SearchWrappedSvArea
                    testId={testId}
                    deletePane={deletePane}
                    setHasTrackInfo={setHasTrackInfo}
                    onePane={onePane}
                    visualizationControls={visualizationControls}
                />
            </TrackInfoProvider>
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
    searchContext }) => {
    // true means show search area, false means show visualization area
    const [searchAndVisualization, setSearchAndVisualization] = useState(true);
    const { tracks, isLoading } = useTrackInfo();
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
                <SearchArea searchContext={searchContext} />
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
                <VisualizationArea visualizationControls={visualizationControls} />
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
    searchContext: PropTypes.object
};

export default Pane;
