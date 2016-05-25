import React from 'react';

import Model from 'components/Model';
import metricsToMonitor from 'constants/metrics';

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).map((modelId, idx) => (
                <Model model={props.data[modelId]}
                  metrics={metricsToMonitor}
                  key={'model-' + idx}
                />
            ))
        }
    </div>
);

DataView.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataView;
