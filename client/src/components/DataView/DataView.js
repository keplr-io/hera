import React from 'react';

import Model from 'components/Model';

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).map((modelId, idx) => (
                <Model model={props.data[modelId]}
                  metrics={props.data.metrics}
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
