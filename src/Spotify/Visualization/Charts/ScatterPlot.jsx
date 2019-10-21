import PropTypes from 'prop-types';
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryScatter, VictoryTooltip } from 'victory';
import { getFeatureLabelText, getFeatureTooltipText } from '../Features';
import { useVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';

/* eslint-disable id-length */
const ScatterPlot = ({ tracks }) => {
    const { visualizationFeatures } = useVisualizationControls();
    const { scatterPlotXFeature, scatterPlotYFeature } = visualizationFeatures;

    const xAxisLabelText = getFeatureLabelText(scatterPlotXFeature);
    const yAxisLabelText = getFeatureLabelText(scatterPlotYFeature);

    const scatterPlotData = Object.values(tracks).map((track) => {
        return {
            name: track.name,
            x: track[scatterPlotXFeature],
            y: track[scatterPlotYFeature]
        };
    });

    return (
        <div className="Chart" data-testid="scatter-plot">
            <VictoryChart
                width={700}
                height={350}
                animate={{
                    duration: 350,
                    easing: 'sinOut'
                }}
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
                    axisLabelComponent={<VictoryLabel x={15} />}
                />
                <VictoryScatter
                    data={scatterPlotData}
                    labels={
                        // eslint-disable-next-line max-len
                        ({ datum }) => `Name: ${datum.name}\n${scatterPlotXFeature}: ${getFeatureTooltipText(scatterPlotXFeature, datum.x)}\n${scatterPlotYFeature}: ${getFeatureTooltipText(scatterPlotYFeature, datum.y)}`
                    }
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
        </div>
    );
};

ScatterPlot.propTypes = {
    tracks: PropTypes.object
};

export default ScatterPlot;