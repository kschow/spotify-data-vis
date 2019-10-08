import React from 'react';
import PropTypes from 'prop-types';
import { AUDIO_FEATURES } from './Features';
import '../../Common/Styles/Controls.scss';

/* eslint-disable id-length */
const VisualizationControls = ({ feature, setFeature }) => {
    const handleSelectChange = (event) => {
        setFeature(event.target.value);
    };

    return (
        <div className="VisualizationControls ControlBox">
            <div className="Selector">
                <label htmlFor="feature">Feature:</label>
                <select
                    id="feature"
                    value={feature}
                    onChange={handleSelectChange}
                >
                    {
                        Object.entries(AUDIO_FEATURES).map((f) => {
                            const [key, value] = f;
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
    feature: PropTypes.string,
    setFeature: PropTypes.func
};

export default VisualizationControls;
