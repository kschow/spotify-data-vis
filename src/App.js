import React from 'react';
import './App.scss';
import { withVisualizationControls } from './Controls/VisualizationControls/VisualizationControlsContext';
import Window from './Controls/Window';

const App = () => {
    const WindowWithVisualizationControls = withVisualizationControls(Window);

    return (
        <div className="App">
            <div className="Header">
                Spotify Data Visualizer
            </div>
            <WindowWithVisualizationControls />
        </div>
    );
};

export default App;
