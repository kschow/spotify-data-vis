import React from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './Charts/BarChart';
import ScatterPlot from './Charts/ScatterPlot';
import './VisualizationArea.scss';
import { useVisualizationControls } from '../../Controls/VisualizationControls/VisualizationControlsContext';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const { chartType } = useVisualizationControls();

    return (
        <>
            {
                isLoading ?
                    <Loading /> :
                    <>
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
