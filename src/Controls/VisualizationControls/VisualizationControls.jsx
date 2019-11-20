import PropTypes from 'prop-types';
import React from 'react';
import '../../Common/Styles/Controls.scss';
import { AUDIO_FEATURES } from './Features';
import './VisualizationControls.scss';
import { useVisualizationControls } from './VisualizationControlsContext';

/* eslint-disable id-length */
const VisualizationControls = () => {
    const { chartType, setChartType, visualizationFeatures, setVisualizationFeatures } = useVisualizationControls();

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const handleBarChartFeatureChange = (event) => {
        setVisualizationFeatures({
            ...visualizationFeatures,
            barChartFeature: event.target.value
        });
    };

    const handleScatterPlotXChange = (event) => {
        setVisualizationFeatures({
            ...visualizationFeatures,
            scatterPlotXFeature: event.target.value
        });
    };

    const handleScatterPlotYChange = (event) => {
        setVisualizationFeatures({
            ...visualizationFeatures,
            scatterPlotYFeature: event.target.value
        });
    };

    return (
        <div className="VisualizationControls ControlBox">
            <div className="Selector">
                <label htmlFor="chart-type">Chart Type:</label>
                <select
                    id="chart-type"
                    value={chartType}
                    onChange={handleChartTypeChange}
                >
                    <option value="bar-chart">Bar Chart</option>
                    <option value="scatter-plot">Scatter Plot</option>
                </select>
            </div>

            {
                chartType === 'bar-chart' ?
                    <div className="Selector">
                        <FeatureDropdown
                            id="barChartFeature"
                            feature={visualizationFeatures.barChartFeature}
                            labelText="Feature:"
                            onChange={handleBarChartFeatureChange}
                        />
                    </div> :
                    <div>
                        <FeatureDropdown
                            id="scatterPlotXFeature"
                            feature={visualizationFeatures.scatterPlotXFeature}
                            labelText="Feature for X Axis:"
                            onChange={handleScatterPlotXChange}
                        />
                        <FeatureDropdown
                            id="scatterPlotYFeature"
                            feature={visualizationFeatures.scatterPlotYFeature}
                            labelText="Feature for Y Axis:"
                            onChange={handleScatterPlotYChange}
                        />
                    </div>
            }
        </div>
    );
};

const FeatureDropdown = ({ id, feature, labelText, onChange }) => {
    return (
        <>
            <label htmlFor={id}>{labelText}</label>
            <select
                id={id}
                value={feature}
                onChange={onChange}
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
        </>
    );
};

FeatureDropdown.propTypes = {
    id: PropTypes.string,
    feature: PropTypes.string,
    labelText: PropTypes.string,
    onChange: PropTypes.func
};

export default VisualizationControls;
