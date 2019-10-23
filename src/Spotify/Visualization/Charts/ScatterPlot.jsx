import PropTypes from 'prop-types';
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryScatter, VictoryTooltip } from 'victory';
import {
    getFeatureLabelText,
    getScatterTickFormat,
    getScatterTickValues,
    getScatterTooltipText,
    scatterFeature
} from '../Features';
import { useVisualizationControls } from '../VisualizationControls/VisualizationControlsContext';

/* eslint-disable id-length */
const ScatterPlot = ({ tracks }) => {
    const { visualizationFeatures } = useVisualizationControls();
    const { scatterPlotXFeature, scatterPlotYFeature } = visualizationFeatures;

    const xAxisLabelText = getFeatureLabelText(scatterPlotXFeature);
    const yAxisLabelText = getFeatureLabelText(scatterPlotYFeature);


    const scatterPlotData = Object.values(tracks)
        .map((track) => {
            return {
                name: track.name,
                x: scatterFeature(track[scatterPlotXFeature], scatterPlotXFeature),
                y: scatterFeature(track[scatterPlotYFeature], scatterPlotYFeature)
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
                    tickValues={getScatterTickValues(scatterPlotXFeature)}
                    tickFormat={getScatterTickFormat(scatterPlotXFeature)}
                    orientation="bottom"
                    axisLabelComponent={<VictoryLabel y={335} />}
                />
                <VictoryAxis
                    dependentAxis
                    label={yAxisLabelText}
                    tickValues={getScatterTickValues(scatterPlotYFeature)}
                    tickFormat={getScatterTickFormat(scatterPlotYFeature)}
                    orientation="left"
                    axisLabelComponent={<VictoryLabel x={15} />}
                />
                <VictoryScatter
                    data={scatterPlotData}
                    labels={
                        ({ datum }) => getScatterTooltipText(datum, scatterPlotXFeature, scatterPlotYFeature)
                    }
                    labelComponent={<VictoryTooltip constrainToVisibleArea />}
                />
            </VictoryChart>
        </div>
    );
};

ScatterPlot.propTypes = {
    tracks: PropTypes.object
};

export default ScatterPlot;
