import React from 'react';
import './App.scss';
import Window from './Controls/Window';

const App = () => {
    return (
        <div className="App">
            <div className="Header">
                Spotify Data Visualizer
            </div>
            <Window />
        </div>
    );
};

export default App;
