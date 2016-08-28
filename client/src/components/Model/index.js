import React from 'react';
import $ from 'jquery';
import Dygraph from 'dygraphs';
import cytoscape from 'cytoscape';
import cydagre from 'cytoscape-dagre';
import dagre from 'dagre';
import { computeCytoscapeGraph } from 'components/Model/util';

export default class Model extends React.Component {
    static propTypes = {
        model: React.PropTypes.object.isRequired,
        metrics: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.graphs = {};
    }

    componentDidMount() {
        this.graphs = this.props.metrics.reduce((graphsMap, metricName) => {
            graphsMap[metricName] = new Dygraph(
                $(this.refs.container).find('.graph-' + metricName)[0],
                this.props.model.metricTimeseries[metricName],
                {
                    drawPoints: true,
                    valueRange: [0, 5],
                    labels: ['batch', metricName]
                }
            );
            return graphsMap;
        }, {});

        cydagre( cytoscape, dagre );

        cytoscape({
            container: this.refs.graphvisContainer,
            elements: computeCytoscapeGraph(this.props.model.kerasConfig),
            layout: {
              name: 'dagre'
            },
            style: [
            {
                selector: 'node',
                style: {
                    'content': 'data(id)',
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'text-margin-x': 10,
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
            ]
        });
    }

    render() {
        const model = this.props.model;
        this.updateGraph(model);
        return <div className='model-container' ref='container'>
            <div className='model-name'>Model: <b>{model.model.id}</b></div>
            <div className='row'>
                <div ref='graphvisContainer' className='graph-vis-container'></div>
            </div>
            <div className='row'>
                {
                    this.props.metrics.map((metricName) => (
                        <div className={'graph-' + metricName + '-container graph-container col-md-6'} key={metricName}>
                            <div className='graph-title panel-label'>{metricName}</div>
                            <div className={'graph-' + metricName}></div>
                        </div>
                    ))
                }
                <div className='config-display col-md-6'>
                    <div className='panel-label'>
                        Training Config
                    </div>

                    <div>
                        <pre>
                            {
                                JSON.stringify(model.trainConfig, null, 4)
                            }
                        </pre>
                    </div>
                </div>
                <div className='config-display col-md-6'>
                    <div className='panel-label'>
                        Keras Config
                    </div>

                    <div>
                        <pre>
                            {
                                JSON.stringify(model.kerasConfig, null, 4)
                            }
                        </pre>
                    </div>
                </div>
            </div>
        </div>;
    }

    updateGraph(model) {
        return this.props.metrics.map((metricName) => (
            this.graphs[metricName] &&
            this.graphs[metricName].updateOptions({
                file: model.metricTimeseries[metricName]
            })
        ));
    }
}
