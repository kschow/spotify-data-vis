/* eslint-disable no-undefined */
import React, { createContext, useContext, useState } from 'react';

const VisualizationControlsContext = createContext(undefined);

const VisualizationControlsProvider = (props) => {
    const [barChartFeature, setBarChartFeature] = useState('loudness');

    return <VisualizationControlsContext.Provider value={
        {
            barChartFeature,
            setBarChartFeature
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
