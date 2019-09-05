import React from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import { VictoryBar } from 'victory';
import { countFeatures } from './BarChartBuckets';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const trackKeyData = countFeatures(tracks, 'key');
    return (
        <div data-testid="chart">
            {
                isLoading ?
                    <Loading/> :
                    <VictoryBar data={trackKeyData} x="display" y="count" />
            }
        </div>
    );
};

export default VisualizationArea;
