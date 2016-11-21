import React, {Component, PropTypes} from 'react';
import Dygraph from 'dygraphs';
import { getMetricColor } from './colors';

import './style.scss';
export default class Timeseries extends Component {

    static propTypes = {
        modelKey: PropTypes.string,
        metricKey: PropTypes.string,
        graphKey: PropTypes.string,
        fillGraph: PropTypes.bool
    }

    componentDidMount() {

        const { modelKey, metricKey, graphKey, fillGraph } = this.props;

        /**
         * Expose this globally so that can be updated
         * without passing through react or redux.
         */

        window.metricGraphs[modelKey][graphKey][metricKey] = new Dygraph(
            this.refs.container,
            window.metricData[modelKey][graphKey][metricKey],
            {
                width: 500,
                height: 150,
                animatedZooms: true,
                labels: ['batch', metricKey],
                color: getMetricColor(metricKey),
                fillGraph
            }
        );
    }

    render() {
        return <div className='plot-container'>
            <div ref='container' />
        </div>;
    }
};
