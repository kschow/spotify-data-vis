import React from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './BarChart';
import './VisualizationArea.scss';
import VisualizationControls from './VisualizationControls/VisualizationControls';
import { VisualizationControlsProvider } from './VisualizationControls/VisualizationControlsContext';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();

    return (
        <>
            {
                isLoading ?
                    <Loading /> :
                    <VisualizationControlsProvider>
                        <VisualizationControls />
                        <BarChart tracks={tracks} />
                    </VisualizationControlsProvider>
            }
        </>
    );
};

export default VisualizationArea;
