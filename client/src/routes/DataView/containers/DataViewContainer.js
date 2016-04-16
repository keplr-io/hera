import { connect } from 'react-redux';
import DataView from 'components/DataView';

const mapStateToProps = (state) => ({
    counter: state.counter
});

export default connect(mapStateToProps, {})(DataView);
