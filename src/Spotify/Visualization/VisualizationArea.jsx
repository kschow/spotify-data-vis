import React, { useEffect, useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './BarChart';
import { countFeatures } from './Features';
import './Visualization.scss';
import VisualizationControls from './VisualizationControls';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const [barChartData, setBarChartData] = useState([]);
    const [feature, setFeature] = useState('loudness');

    useEffect(() => {
        setBarChartData(countFeatures(tracks, feature));
    }, [tracks, feature]);

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
                            feature={feature}
                            barChartData={barChartData}
                        />
                    </>
            }
        </>
    );
};

export default VisualizationArea;
