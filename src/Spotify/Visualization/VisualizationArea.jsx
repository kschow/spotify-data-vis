import PropTypes from 'prop-types';
import React from 'react';

const VisualizationArea = ({ tracks }) => {
    return Object.values(tracks).map((track) => {
        return (
            <div key={track.spotifyId}>
                {track.spotifyId}
            </div>
        );
    });
};

VisualizationArea.propTypes = {
    tracks: PropTypes.object
};

export default VisualizationArea;
