import React from 'react';
import PropTypes from 'prop-types';
import { AUDIO_FEATURES } from './Buckets';
import '../../Common/Styles/Controls.scss';

const VisualizationControls = ({ bucket, setBucket }) => {
    const handleSelectChange = (event) => {
        setBucket(event.target.value);
    };

    return (
        <div className="VisualizationControls ControlBox">
            <div className="Selector">
                <label htmlFor="feature">Feature:</label>
                <select
                    id="feature"
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
        </div>
    );
};

VisualizationControls.propTypes = {
    bucket: PropTypes.string,
    setBucket: PropTypes.func
};

export default VisualizationControls;
