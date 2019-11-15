import React from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './Charts/BarChart';
import ScatterPlot from './Charts/ScatterPlot';
import './VisualizationArea.scss';
import VisualizationControls from './VisualizationControls/VisualizationControls';
import { useVisualizationControls } from './VisualizationControls/VisualizationControlsContext';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const { chartType } = useVisualizationControls();

    return (
        <>
            {
                isLoading ?
                    <Loading /> :
                        <>
                            <VisualizationControls />
                            {
                                chartType === 'bar-chart' ?
                                    <BarChart tracks={tracks} /> :
                                    <ScatterPlot tracks={tracks} />
                            }
                        </>
            }
        </>
    );
};

export default VisualizationArea;
