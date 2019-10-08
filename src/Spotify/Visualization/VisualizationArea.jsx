import React, { useEffect, useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './BarChart';
import { countFeatures, AUDIO_FEATURES } from './Buckets';
import { isEmpty } from 'lodash';
import './Visualization.scss';
import VisualizationControls from './VisualizationControls';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const [barChartData, setBarChartData] = useState([]);
    const [bucket, setBucket] = useState('loudness');

    useEffect(() => {
        setBarChartData(countFeatures(tracks, bucket));
    }, [tracks, bucket]);

    const unitText = isEmpty(AUDIO_FEATURES[bucket].units) ?
        '' :
        `(${AUDIO_FEATURES[bucket].units})`;

    const labelText = `${AUDIO_FEATURES[bucket].displayName} ${unitText}`;

    return (
        <>
            {
                isLoading ?
                    <Loading/> :
                    <>
                        <VisualizationControls
                            bucket={bucket}
                            setBucket={setBucket}
                        />
                        <BarChart
                            bucket={bucket}
                            labelText={labelText}
                            barChartData={barChartData}
                        />
                    </>
            }
        </>
    );
};

export default VisualizationArea;
