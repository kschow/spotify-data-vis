import React from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    return (
        <>
            {
                isLoading ?
                    <Loading/> :
                    Object.values(tracks)
                        .map((track) => {
                            return (
                                <div key={track.spotifyId}>
                                    {track.spotifyId}
                                </div>
                            );
                        })
            }
        </>
    );
};

export default VisualizationArea;
