import React from 'react';
import './App.scss';
import Pane from './Spotify/Pane';

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
