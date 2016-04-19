import { connect } from 'react-redux';
import { connectToSocket } from '../services/sockets';

import DataView from 'components/DataView';

connectToSocket();

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {})(DataView);
