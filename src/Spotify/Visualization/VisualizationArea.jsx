import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import { countFeatures, AUDIO_FEATURES } from './BarChartBuckets';
import { isEmpty } from 'lodash';
import './Visualization.scss';
import VisualizationControls from './VisualizationControls';

/* eslint-disable id-length */
const VisualizationArea = () => {
    const { tracks, isLoading } = useTrackInfo();
    const [barchartData, setBarchartData] = useState([]);
    const [bucket, setBucket] = useState('loudness');

    useEffect(() => {
        setBarchartData(countFeatures(tracks, bucket));
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
                        <div className="Chart" data-testid="chart">
                            <VictoryChart
                                domainPadding={{ x: AUDIO_FEATURES[bucket].chartDomainPadding }}
                                width={700}
                                height={350}
                            >
                                <VictoryLabel
                                    text={labelText}
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
