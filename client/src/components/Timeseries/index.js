import React, {Component, PropTypes} from 'react';
import Dygraph from 'dygraphs';
import { getMetricColor } from './colors';

import './style.scss';
export default class Timeseries extends Component {

    static propTypes = {
        modelKey: PropTypes.string,
        metricKey: PropTypes.string,
        graphKey: PropTypes.string
    }

    componentDidMount() {

        const { modelKey, metricKey, graphKey } = this.props;

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
                labels: ['batch', metricKey],
                color: getMetricColor(metricKey)
            }
        );
    }

    render() {
        return <div>
            <div ref='container' />
        </div>;
    }
};
