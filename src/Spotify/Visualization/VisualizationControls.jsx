import React from 'react';
import PropTypes from 'prop-types';
import { audioFeatureList } from './BarChartBuckets';

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
                    audioFeatureList.map((feature) => <option key={feature}>{feature}</option>)
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
