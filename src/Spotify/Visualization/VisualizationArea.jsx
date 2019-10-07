import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import { countFeatures } from './BarChartBuckets';
import './Visualization.scss';
import VisualizationControls from './VisualizationControls';

const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const [barchartData, setBarchartData] = useState([]);
    const [bucket, setBucket] = useState('loudness');

    useEffect(() => {
        setBarchartData(countFeatures(tracks, bucket));
    }, [tracks, bucket]);

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
                        <div className="chart" data-testid="chart">
                            <VictoryChart
                                domainPadding={20}
                                width={700}
                                height={350}
                            >
                                <VictoryLabel
                                    text={bucket}
                                    x={350}
                                    y={340}
                                    textAnchor={'middle'}
                                />
                                <VictoryBar
                                    data={barchartData}
                                    x="display"
                                    y="count"
                                />
                            </VictoryChart>
                        </div>
                    </>
            }
        </>
    );
};

export default VisualizationArea;
