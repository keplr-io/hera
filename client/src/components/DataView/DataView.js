import React from 'react';

import Model from 'components/Model';
import metricsToMonitor from 'constants/metrics';

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).length ?
            Object.keys(props.data).map((modelId, idx) => (
                props.data[modelId] && <Model model={props.data[modelId]}
                  metrics={metricsToMonitor}
                  key={'model-' + idx}
                />
            ))
            : 'Waiting for models...'
        }
    </div>
);


DataView.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataView;
