import React from 'react';

import Model from 'components/Model';

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).map((modelId, idx) => {
                const model = props.data[modelId];
                <Model model={model} key={'model-' + idx} />;
            })
        }
    </div>
);

DataView.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataView;
