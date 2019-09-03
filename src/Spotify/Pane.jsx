import { isEmpty } from 'lodash/lang';
import React, { useState } from 'react';
import SearchArea from './Search/SearchArea';
import TracksService from './Tracks/TracksService';
import VisualizationArea from './Visualization/VisualizationArea';

export const Pane = () => {
    const [tracks, setTracks] = useState({});
    // true means show search area, false means show visualization area
    const [searchAndVisualization, setSearchAndVisualization] = useState(true);

    const toggleSearchAndVisualization = () => {
        setSearchAndVisualization(!searchAndVisualization);
    };

    const getTracksForX = (getFn, spotifyId) => {
        return getFn(spotifyId)
            .then((results) => {
                setTracks(results);
                toggleSearchAndVisualization();
            });
    };

    const getTracks = (spotifyId, type) => {
        if (type === 'artist') {
            getTracksForX(TracksService.getArtistTracks, spotifyId);
        } else if (type === 'playlist') {
            getTracksForX(TracksService.getPlaylistTracks, spotifyId);
        }
    };

    const displaySearchArea = () => {
        return (
            <>
                <SearchArea getTracks={getTracks} />
                {
                    isEmpty(tracks) ?
                        null :
                        <a onClick={toggleSearchAndVisualization}>Show visualization</a>
                }
            </>
        );
    };

    const displayVisualizationArea = () => {
        return (
            <>
                <VisualizationArea tracks={tracks} />
                <a onClick={toggleSearchAndVisualization}>Go back to search</a>
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
