import React, { useState } from 'react';
import Pane from './Pane';
import './Window.scss';
import { VisualizationControlsProvider } from './VisualizationControls/VisualizationControlsContext';

const Window = () => {
    const [panes, setPanes] = useState([
        {
            testId: 0
        }
    ]);

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
            <div className={`Window${gridSetupCss()}`}>
                {
                    panes.map((pane, index) => {
                        return <Pane
                            key={pane.testId}
                            testId={pane.testId}
                            deletePane={() => deletePane(index)}
                        />;
                    })
                }
                {
                    panes.length < 4 ?
                        <button className="AddComparison Button" onClick={addPane}>Add Comparison</button> :
                        null
                }
            </div>
        </VisualizationControlsProvider>
    );
};

export default Window;
