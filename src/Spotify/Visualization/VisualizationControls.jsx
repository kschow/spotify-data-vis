import React from 'react';
import PropTypes from 'prop-types';
import { AUDIO_FEATURES } from './BarChartBuckets';

const VisualizationControls = ({ bucket, setBucket }) => {
    const handleSelectChange = (event) => {
        setBucket(event.target.value);
    };

    return (
        <div>
            <select
                value={bucket}
                onChange={handleSelectChange}
            >
                {
                    Object.entries(AUDIO_FEATURES).map((feature) => {
                        const [key, value] = feature;
                        return (
                            <option
                                key={key}
                                value={key}
                            >
                                {value.displayName}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
};

VisualizationControls.propTypes = {
    bucket: PropTypes.string,
    setBucket: PropTypes.func
};

export default VisualizationControls;
