import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Pane } from './Pane';
import VisualizationControls from './VisualizationControls/VisualizationControls';
import './Window.scss';

class Window extends Component {
    constructor(props) {
        super(props);

        this.state = {
            panes: [{ testId: 0 }],
            hasTrackInfo: false
        };

        this.addPane = this.addPane.bind(this);
        this.deletePane = this.deletePane.bind(this);
    }

    addPane() {
        const lastPane = this.state.panes[this.state.panes.length - 1];

        this.setState({
            panes: [
                ...this.state.panes, {
                    testId: lastPane.testId + 1
                }
            ]
        });
    }

    deletePane(index) {
        return () => {
            if (this.state.panes.length > 1) {
                this.state.panes.splice(index, 1);
                this.setState({
                    panes: [...this.state.panes]
                });
            }
        };
    }

    hasTrackInfoOrMultiplePanes() {
        return this.state.panes.length > 1 || this.state.hasTrackInfo;
    }

    gridSetupCss() {
        if (this.state.panes.length <= 1) {
            return '';
        }
        if (this.state.panes.length === 2) {
            return ' Grid Two';
        }

        return ' Grid';
    }

    render() {
        return (
            <>
                {
                    this.hasTrackInfoOrMultiplePanes() &&
                    <VisualizationControls visualizationControls={this.props.visualizationControls} />
                }
                <div className={`Window${this.gridSetupCss()}`}>
                    {
                        this.state.panes.map((pane, index) => {
                            return <Pane
                                key={pane.testId}
                                testId={pane.testId}
                                deletePane={this.deletePane(index)}
                                setHasTrackInfo={() => this.setState({ hasTrackInfo: true })}
                                numPanes={this.state.panes.length}
                                index={index}
                                visualizationControls={this.props.visualizationControls}
                            />;
                        })
                    }
                    {
                        this.state.panes.length < 4 &&
                        <div className="AddComparison">
                            <button className="Button" onClick={this.addPane}>Add Comparison</button>
                        </div>
                    }
                </div>
            </>
        );
    }
}

Window.propTypes = {
    visualizationControls: PropTypes.object
};

export default Window;
