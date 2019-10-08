import React, { useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './BarChart';
import './Visualization.scss';
import VisualizationControls from './VisualizationControls';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const [feature, setFeature] = useState('loudness');

    return (
        <>
            {
                isLoading ?
                    <Loading/> :
                    <>
                        <VisualizationControls
                            feature={feature}
                            setFeature={setFeature}
                        />
                        <BarChart
                            tracks={tracks}
                            feature={feature}
                        />
                    </>
            }
        </>
    );
};

export default VisualizationArea;
