import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../Common/Loading/Loading';
import BarChart from './Charts/BarChart';
import ScatterPlot from './Charts/ScatterPlot';
import './VisualizationArea.scss';

const VisualizationArea = ({ visualizationControls, trackInfoContext }) => {
    const { tracks, isLoading } = trackInfoContext;
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
    visualizationControls: PropTypes.object,
    trackInfoContext: PropTypes.object
};

export default VisualizationArea;
