import React, { Component } from 'react';

const withVisualizationControls = (WrappedComponent) => {
    return class VisualizationControlsWrapper extends Component {
        constructor (props) {
            super(props);

            this.state = {
                chartType: 'bar-chart',
                visualizationFeatures: {
                    barChartFeature: 'loudness',
                    scatterPlotXFeature: 'loudness',
                    scatterPlotYFeature: 'energy'
                }
            };

            this.setChartType.bind(this);
            this.setVisualizationFeatures.bind(this);
        }

        setChartType (chartType) {
            this.setState({ chartType });
        }

        setVisualizationFeatures (visualizationFeatures) {
            this.setState({ visualizationFeatures });
        }

        render () {
            return (
                <WrappedComponent visualizationControls={{
                    chartType: this.state.chartType,
                    visualizationFeatures: this.state.visualizationFeatures,
                    setChartType: (chartType) => this.setChartType(chartType),
                    setVisualizationFeatures: (features) => this.setVisualizationFeatures(features)
                }} {...this.props} />
            );
        }
    };
};

export { withVisualizationControls };
