import PropTypes from 'prop-types';
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryScatter } from 'victory';
import { getFeatureLabelText } from '../Features';
import { useVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';

/* eslint-disable id-length */
const ScatterPlot = ({ tracks }) => {
    const { visualizationFeatures } = useVisualizationControls();
    const { scatterPlotXFeature, scatterPlotYFeature } = visualizationFeatures;

    const xAxisLabelText = getFeatureLabelText(scatterPlotXFeature);
    const yAxisLabelText = getFeatureLabelText(scatterPlotYFeature);

    const scatterPlotData = Object.values(tracks).map((track) => {
        return {
            x: track[scatterPlotXFeature],
            y: track[scatterPlotYFeature]
        };
    });

    return (
        <div className="Chart" data-testid="scatter-plot">
            <VictoryChart
                width={700}
                height={350}
            >
                <VictoryAxis
                    label={xAxisLabelText}
                    orientation="bottom"
                    axisLabelComponent={<VictoryLabel y={335} />}
                />
                <VictoryAxis
                    dependentAxis
                    label={yAxisLabelText}
                    orientation="left"
                    axisLabelComponent={<VictoryLabel x={20} />}
                />
                <VictoryScatter data={scatterPlotData} />
            </VictoryChart>
        </div>
    );
};

ScatterPlot.propTypes = {
    tracks: PropTypes.object
};

export default ScatterPlot;
