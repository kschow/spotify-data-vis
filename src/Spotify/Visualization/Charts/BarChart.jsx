import PropTypes from 'prop-types';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip } from 'victory';
import { countFeature, getFeatureDomainPadding, getFeatureLabelText } from '../Features';
import { useVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';

/* eslint-disable id-length */
const BarChart = ({ tracks }) => {
    const { visualizationFeatures } = useVisualizationControls();
    const { barChartFeature } = visualizationFeatures;

    const labelText = getFeatureLabelText(barChartFeature);
    const barChartData = countFeature(tracks, barChartFeature);

    return (
        <div className="Chart" data-testid="bar-chart">
            <VictoryChart
                domainPadding={{ x: getFeatureDomainPadding(barChartFeature) }}
                width={700}
                height={350}
                animate={{
                    duration: 350,
                    easing: 'sinOut'
                }}
            >
                <VictoryAxis
                    label={labelText}
                    axisLabelComponent={<VictoryLabel y={335} />}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `${Math.round(t)}`}
                    label="Count"
                    axisLabelComponent={<VictoryLabel x={15} />}
                />
                <VictoryBar
                    data={barChartData}
                    x="display"
                    y="count"
                    labels={({ datum }) => `count: ${datum.count}`}
                    labelComponent={<VictoryTooltip constrainToVisibleArea />}
                />
            </VictoryChart>
        </div>
    );
};

BarChart.propTypes = {
    tracks: PropTypes.object
};

export default BarChart;
