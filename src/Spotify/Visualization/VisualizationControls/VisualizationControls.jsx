import React from 'react';
import '../../../Common/Styles/Controls.scss';
import { AUDIO_FEATURES } from '../Features';
import './VisualizationControls.scss';
import { useVisualizationControls } from './VisualizationControlsContext';

/* eslint-disable id-length */
const VisualizationControls = () => {
    const { barChartFeature, setBarChartFeature } = useVisualizationControls();
    const handleSelectChange = (event) => {
        setBarChartFeature(event.target.value);
    };

    return (
        <div className="VisualizationControls ControlBox">
            <div className="Selector">
                <label htmlFor="feature">Feature:</label>
                <select
                    id="feature"
                    value={barChartFeature}
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

export default VisualizationControls;
