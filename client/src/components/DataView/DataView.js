import React from 'react';

import Dygraph from 'dygraphs';

let lossGraph = null;
let accGraph = null;

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).map((modelId, idx) => {
                const model = props.data[modelId];
                if (model) {
                    return <div key={'model-' + idx}>
                        <div>Model: {model.model.id}</div>
                        <div id={'graph-loss-' + model.model.id}></div>
                        <div id={'graph-acc-' + model.model.id}></div>
                        <div>
                            Training Config
                            <pre>
                                {
                                    JSON.stringify(model.trainConfig, null, 4)
                                }
                            </pre>
                        </div>
                        {
                            (() => {
                                setTimeout(() => {
                                    if (!lossGraph) {
                                        lossGraph = new Dygraph(
                                            document.getElementById('graph-loss-' + model.model.id),
                                            model.metricTimeseries.loss,
                                            {
                                                drawPoints: true,
                                                showRoller: true,
                                                valueRange: [0, 5],
                                                labels: ['Batch', 'Loss']
                                            }
                                        );
                                    } else {
                                        lossGraph.updateOptions({ 'file': model.metricTimeseries.loss });
                                    }
                                }, 0);
                            })()
                        }
                        {
                            (() => {
                                setTimeout(() => {
                                    if (!accGraph) {
                                        accGraph = new Dygraph(
                                            document.getElementById('graph-acc-' + model.model.id),
                                            model.metricTimeseries.loss,
                                            {
                                                drawPoints: true,
                                                showRoller: true,
                                                valueRange: [0, 5],
                                                labels: ['Batch', 'acc']
                                            }
                                        );
                                    } else {
                                        accGraph.updateOptions({ 'file': model.metricTimeseries.acc });
                                    }
                                }, 0);
                            })()
                        }
                    </div>;
                };
            })
        }
    </div>
);



DataView.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataView;
