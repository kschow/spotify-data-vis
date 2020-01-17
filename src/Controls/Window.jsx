import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Pane } from './Pane';
import VisualizationControls from './VisualizationControls/VisualizationControls';
import './Window.scss';


const Window = ({ visualizationControls }) => {
    const [panes, setPanes] = useState([{ testId: 0 }]);

    const [hasTrackInfo, setHasTrackInfo] = useState(false);

    const addPane = (event) => {
        event.preventDefault();

        const lastPane = panes.length === 0 ?
            { testId: 0 } :
            panes[panes.length - 1];
        setPanes([
            ...panes, {
                testId: lastPane.testId + 1
            }
        ]);
    };

    const deletePane = (index) => {
        if (panes.length > 1) {
            panes.splice(index, 1);
            setPanes([...panes]);
        }
    };

    const hasTrackInfoOrMultiplePanes = () => {
        return panes.length > 1 || hasTrackInfo;
    };

    const gridSetupCss = () => {
        if (panes.length <= 1) {
            return '';
        }
        if (panes.length === 2) {
            return ' Grid Two';
        }

        return ' Grid';
    };

    return (
        <>
            { hasTrackInfoOrMultiplePanes() && <VisualizationControls visualizationControls={visualizationControls} /> }
            <div className={`Window${gridSetupCss()}`}>
                {
                    panes.map((pane, index) => {
                        return <Pane
                            key={pane.testId}
                            testId={pane.testId}
                            deletePane={() => deletePane(index)}
                            setHasTrackInfo={() => setHasTrackInfo(true)}
                            numPanes={panes.length}
                            index={index}
                            visualizationControls={visualizationControls}
                        />;
                    })
                }
                {
                    panes.length < 4 &&
                        <div className="AddComparison">
                            <button className="Button" onClick={addPane}>Add Comparison</button>
                        </div>
                }
            </div>
        </>
    );
};

Window.propTypes = {
    visualizationControls: PropTypes.object
};

export default Window;
