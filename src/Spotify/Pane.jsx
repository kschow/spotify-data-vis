import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import SearchArea from './Search/SearchArea';
import { SearchProvider } from './Search/Service/SearchContext';
import { TrackInfoProvider, useTrackInfo } from './TrackInfo/TrackInfoContext';
import VisualizationArea from './Visualization/VisualizationArea';

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
            <>
                <VisualizationArea />
                {
                    isLoading ?
                        null :
                        <button className="link-button" onClick={toggleSearchAndVisualization}>
                            Go back to search
                        </button>
                }
            </>
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
