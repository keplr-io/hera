import React, {Component, PropTypes} from 'react';
import Dygraph from 'dygraphs';
import { getMetricColor } from './colors'

import './style.scss';
export default class Timeseries extends Component {

    static propTypes = {
        modelKey: PropTypes.string,
        metricKey: PropTypes.string
    }

    componentDidMount() {

        const { modelKey, metricKey } = this.props;

        /**
         * Expose this globally so that can be updated
         * without passing through react or redux.
         */

        window.metricGraphs[modelKey][metricKey] = new Dygraph(
            this.refs.container,
            window.metricData[modelKey][metricKey],
            {
                width: 500,
                height: 150,
                labels: ['batch', metricKey],
                color: getMetricColor(metricKey),
                fillGraph: true
            }
        );
    }

    render() {
        return <div>
            <div ref='container' />
        </div>;
    }
};
