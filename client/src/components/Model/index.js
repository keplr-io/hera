import React from 'react';
import $ from 'jquery';
import Dygraph from 'dygraphs';

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
                    showRoller: true,
                    valueRange: [0, 5],
                    labels: ['batch', metricName]
                }
            );
            return graphsMap;
        }, {});
    }

    render() {
        const model = this.props.model;
        this.updateGraph(model);
        return <div ref='container'>
            <div>Model: {model.model.id}</div>
            {
                this.props.metrics.map((metricName) => (
                    <div className={'graph-' + metricName + '-container'} key={metricName}>
                        <div>{metricName}</div>
                        <div className={'graph-' + metricName}></div>
                    </div>
                ))
            }
            <div>
                Training Config
                <code>
                    <pre>
                        {
                            JSON.stringify(model.trainConfig, null, 4)
                        }
                    </pre>
                </code>
            </div>
        </div>;
    }

    updateGraph(model) {
        return this.props.metrics.map((metricName) => (
            this.graphs[metricName] &&
            this.graphs[metricName].updateOptions({ 'file': model.metricTimeseries[metricName] })
        ));
    }
}
