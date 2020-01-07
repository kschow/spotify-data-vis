import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import SearchArea from '../Spotify/Search/SearchArea';
import { SearchProvider, useSearch } from '../Spotify/Search/Service/SearchContext';
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

const Pane = ({ testId, deletePane, setHasTrackInfo, numPanes, index }) => {
    const onePane = numPanes === 1;

    return (
        <div className={`Pane${paneIndexCss(index, numPanes)}`} data-testid={testId}>
            <SearchProvider>
                <TrackInfoProvider>
                    <SearchAndVisualizationArea
                        testId={testId}
                        deletePane={deletePane}
                        setHasTrackInfo={setHasTrackInfo}
                        onePane={onePane}
                    />
                </TrackInfoProvider>
            </SearchProvider>
        </div>
    );
};

Pane.propTypes = {
    testId: PropTypes.number,
    deletePane: PropTypes.func,
    setHasTrackInfo: PropTypes.func,
    numPanes: PropTypes.number,
    index: PropTypes.number
};

const SearchAndVisualizationArea = ({ testId, deletePane, setHasTrackInfo, onePane }) => {
    // true means show search area, false means show visualization area
    const [searchAndVisualization, setSearchAndVisualization] = useState(true);
    const { tracks, isLoading } = useTrackInfo();
    const { isSearchBox, searchResults, goToSearch, goToResults } = useSearch();

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
                <SearchArea />
                <div className="Controls">
                    {
                        isSearchBox && !isEmpty(searchResults) ?
                            <button className="link-button" onClick={goToResults}>
                                Show results
                            </button> :
                            null
                    }
                    {
                        !isSearchBox ?
                            <button className="link-button" onClick={goToSearch}>
                                Go back to search
                            </button> :
                            null
                    }
                    {
                        isEmpty(tracks) ?
                            null :
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
                <VisualizationArea />
                <div className="Controls">
                    {
                        isLoading ?
                            null :
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
    onePane: PropTypes.bool
};

export default Pane;
