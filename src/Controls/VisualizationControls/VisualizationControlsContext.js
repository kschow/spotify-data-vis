/* eslint-disable no-undefined */
import React, { createContext, useContext, useState } from 'react';

const VisualizationControlsContext = createContext(undefined);

const VisualizationControlsProvider = (props) => {
    const [chartType, setChartType] = useState('bar-chart');
    const [visualizationFeatures, setVisualizationFeatures] = useState({
        barChartFeature: 'loudness',
        scatterPlotXFeature: 'loudness',
        scatterPlotYFeature: 'energy'
    });

    return <VisualizationControlsContext.Provider value={
        {
            chartType,
            setChartType,
            visualizationFeatures,
            setVisualizationFeatures
        }
    } {...props} />;
};

const useVisualizationControls = () => {
    const context = useContext(VisualizationControlsContext);
    if (context === undefined) {
        throw new Error('useVisualizationControls must be used within a VisualizationControlsProvider');
    }
    return context;
};

export { VisualizationControlsProvider, useVisualizationControls };
