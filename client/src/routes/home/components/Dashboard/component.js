import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import Dygraph from 'dygraphs';
import './style.scss';

export default class Dashboard extends Component {

    static propTypes = {
    }

    componentDidMount() {

        /**
         * Expose this globally so that can be updated
         * without passing through react or redux.
         */

        window.metricGraphs['mnist-mlp'] = new Dygraph(
            this.refs.container,
            window.metricData['mnist-mlp'].acc,
            {
                labels: ['batch', 'acc']
            }
        );
    }

    render() {
        return <div>
            <div ref='container' />
        </div>;
    }
};
