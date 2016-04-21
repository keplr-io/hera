import { connect } from 'react-redux';

import DataView from 'components/DataView';

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {})(DataView);
