import PropTypes from 'prop-types';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import { countFeatures, getFeatureDomainPadding, getFeatureLabelText } from '../Features';
import { useVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';

/* eslint-disable id-length */
const BarChart = ({ tracks }) => {
    const { visualizationFeatures } = useVisualizationControls();
    const { barChartFeature } = visualizationFeatures;

    const labelText = getFeatureLabelText(barChartFeature);
    const barChartData = countFeatures(tracks, barChartFeature);

    return (
        <div className="Chart" data-testid="bar-chart">
            <VictoryChart
                domainPadding={{ x: getFeatureDomainPadding(barChartFeature) }}
                width={700}
                height={350}
            >
                <VictoryAxis
                    label={labelText}
                    axisLabelComponent={<VictoryLabel y={335} />}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `${Math.round(t)}`}
                    label="Count"
                    axisLabelComponent={<VictoryLabel x={20} />}
                />
                <VictoryBar
                    data={barChartData}
                    x="display"
                    y="count"
                />
            </VictoryChart>
        </div>
    );
};

BarChart.propTypes = {
    tracks: PropTypes.object
};

export default BarChart;
