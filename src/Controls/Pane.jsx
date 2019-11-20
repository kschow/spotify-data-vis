import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import SearchArea from '../Spotify/Search/SearchArea';
import { SearchProvider } from '../Spotify/Search/Service/SearchContext';
import { TrackInfoProvider, useTrackInfo } from '../Spotify/TrackInfo/TrackInfoContext';
import VisualizationArea from '../Spotify/Visualization/VisualizationArea';
import { VisualizationControlsProvider } from './VisualizationControls/VisualizationControlsContext';

const Pane = () => {
    return (
        <>
            <SearchProvider>
                <TrackInfoProvider>
                    <SearchAndVisualizationArea />
                </TrackInfoProvider>
            </SearchProvider>
        </>
    );
};

const SearchAndVisualizationArea = () => {
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
            <>
                <SearchArea />
                {
                    isEmpty(tracks) ?
                        null :
                        <button className="link-button" onClick={toggleSearchAndVisualization}>
                            Show visualization
                        </button>
                }
            </>
        );
    };

    const displayVisualizationArea = () => {
        return (
            <VisualizationControlsProvider>
                <VisualizationArea />
                {
                    isLoading ?
                        null :
                        <button className="link-button" onClick={toggleSearchAndVisualization}>
                            Go back to search
                        </button>
                }
            </VisualizationControlsProvider>
        );
    };

    return (
        <div className="Pane">
            {
                searchAndVisualization ?
                    displaySearchArea() :
                    displayVisualizationArea()
            }
        </div>
    );
};

export default Pane;
