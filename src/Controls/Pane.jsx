import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import SearchArea from '../Spotify/Search/SearchArea';
import { SearchProvider } from '../Spotify/Search/Service/SearchContext';
import { TrackInfoProvider, useTrackInfo } from '../Spotify/TrackInfo/TrackInfoContext';
import VisualizationArea from '../Spotify/Visualization/VisualizationArea';
import './Pane.scss';

const Pane = ({ testId, deletePane }) => {
    return (
        <div className="Pane" data-testid={testId}>
            <SearchProvider>
                <TrackInfoProvider>
                    <SearchAndVisualizationArea testId={testId} deletePane={deletePane}/>
                </TrackInfoProvider>
            </SearchProvider>
        </div>
    );
};

Pane.propTypes = {
    testId: PropTypes.number,
    deletePane: PropTypes.func
};

const SearchAndVisualizationArea = ({ testId, deletePane }) => {
    // true means show search area, false means show visualization area
    const [searchAndVisualization, setSearchAndVisualization] = useState(true);
    const { tracks, isLoading } = useTrackInfo();

    const toggleSearchAndVisualization = useCallback(() => {
        setSearchAndVisualization(!searchAndVisualization);
    }, [searchAndVisualization]);

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
            <div>
                <SearchArea />
                {
                    isEmpty(tracks) ?
                        null :
                        <button className="link-button" onClick={toggleSearchAndVisualization}>
                            Show visualization
                        </button>
                }
            </div>
        );
    };

    const displayVisualizationArea = () => {
        return (
            <div>
                <VisualizationArea />
                {
                    isLoading ?
                        null :
                        <button className="link-button" onClick={toggleSearchAndVisualization}>
                            Go back to search
                        </button>
                }
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
                isLoading ?
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
    deletePane: PropTypes.func
};

export default Pane;
