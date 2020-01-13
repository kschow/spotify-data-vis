import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../Common/Loading/Loading';
import { useTrackInfo } from '../TrackInfo/TrackInfoContext';
import BarChart from './Charts/BarChart';
import ScatterPlot from './Charts/ScatterPlot';
import './VisualizationArea.scss';

const VisualizationArea = ({ visualizationControls }) => {
    const { tracks, isLoading } = useTrackInfo();
    const { chartType } = visualizationControls;

    return (
        <>
            {
                isLoading ?
                    <Loading /> :
                    <>
                        {
                            chartType === 'bar-chart' ?
                                <BarChart tracks={tracks} visualizationControls={visualizationControls} /> :
                                <ScatterPlot tracks={tracks} visualizationControls={visualizationControls} />
                        }
                    </>
            }
        </>
    );
};

VisualizationArea.propTypes = {
    visualizationControls: PropTypes.object
};

export default VisualizationArea;
