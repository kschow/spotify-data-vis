import PropTypes from 'prop-types';
import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import { getFeatureDomainPadding, getFeatureLabelText } from './Features';

/* eslint-disable id-length */
const BarChart = ({ feature, barChartData }) => {
    const labelText = getFeatureLabelText(feature);

    return (
        <div className="Chart" data-testid="bar-chart">
            <VictoryChart
                domainPadding={{ x: getFeatureDomainPadding(feature) }}
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
    feature: PropTypes.string,
    barChartData: PropTypes.arrayOf(PropTypes.object)
};

export default BarChart;
