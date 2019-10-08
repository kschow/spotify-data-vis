import React from 'react';
import { AUDIO_FEATURES } from './Buckets';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryBar } from 'victory';

/* eslint-disable id-length */
const BarChart = ({ bucket, labelText, barChartData }) => {
    return (
        <div className="Chart" data-testid="bar-chart">
            <VictoryChart
                domainPadding={{ x: AUDIO_FEATURES[bucket].chartDomainPadding }}
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
    bucket: PropTypes.string,
    labelText: PropTypes.string,
    barChartData: PropTypes.arrayOf(PropTypes.object)
};

export default BarChart;
