import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import SearchArea from './Search/SearchArea';
import { SearchProvider } from './Search/Service/SearchContext';
import { TrackInfoProvider, useTrackInfo } from './TrackInfo/TrackInfoContext';
import VisualizationArea from './Visualization/VisualizationArea';
import { VisualizationControlsProvider } from './Visualization/VisualizationControls/VisualizationControlsContext';

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
