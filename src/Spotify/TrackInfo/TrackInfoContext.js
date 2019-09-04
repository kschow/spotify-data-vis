/* eslint-disable no-undefined */
/* eslint-disable no-empty-function */
import React, { createContext, useContext, useState } from 'react';
import { TrackInfoService } from './TrackInfoService';

const TrackInfoContext = createContext(undefined);

const TrackInfoProvider = (props) => {
    const [tracks, setTracks] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getTracksForX = (tracksFunction, spotifyId) => {
        return tracksFunction(spotifyId)
            .then((response) => setTracks(response))
            .catch(() => setErrorMessage('Getting track information failed.'))
            .finally(() => setIsLoading(false));
    };

    const getTracks = (spotifyId, searchType) => {
        setTracks({});
        setErrorMessage('');
        setIsLoading(true);

        if (searchType === 'artist') {
            getTracksForX(TrackInfoService.getArtistTracks, spotifyId);
        } else if (searchType === 'playlist') {
            getTracksForX(TrackInfoService.getPlaylistTracks, spotifyId);
        }
    };

    return <TrackInfoContext.Provider value={
        {
            tracks,
            errorMessage,
            isLoading,
            getTracks
        }
    } {...props} />;
};

const useTrackInfo = () => {
    const context = useContext(TrackInfoContext);
    if (context === undefined) {
        throw new Error('useTrackInfo must be used within a TrackInfoProvider');
    }
    return context;
};

export { TrackInfoProvider, useTrackInfo };
