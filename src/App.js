import React from 'react';
import './App.scss';
import Pane from './Controls/Pane';

const App = () => {
    return (
        <div className="App">
            <div className="Header">
                Spotify Data Visualizer
            </div>
            <Pane />
        </div>
    );
};

export default App;
