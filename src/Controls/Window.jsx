import React, { useState } from 'react';
import Pane from './Pane';
import './Window.scss';
import VisualizationControls from './VisualizationControls/VisualizationControls';
import { VisualizationControlsProvider } from './VisualizationControls/VisualizationControlsContext';

const Window = () => {
    const [panes, setPanes] = useState([{ testId: 0 }]);

    const [hasTrackInfo, setHasTrackInfo] = useState(false);

    const addPane = () => {
        const lastPane = panes[panes.length - 1];
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
        <VisualizationControlsProvider>
            { hasTrackInfoOrMultiplePanes() && <VisualizationControls /> }
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
        </VisualizationControlsProvider>
    );
};

export default Window;
