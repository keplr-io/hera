import { connect } from 'react-redux';

import DashboardComponent from './component';
import {toggleGraph} from '../../state/app-state';

export default connect(
    state => ({
        models: state.models,
        collapsedMap: state.collapsedMap
    }),
    {
        toggleGraph
    }
)(DashboardComponent);
