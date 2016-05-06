import React from 'react';

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).map((modelId, idx) => {
                const model = props.data[modelId];
                if (model) {
                    return <div key={'model-' + idx}>
                        <div>Model: {model.model.id}</div>
                        <div>
                            Training Config
                            <pre>
                                {
                                    JSON.stringify(model.trainConfig, null, 4)
                                }
                            </pre>
                        </div>
                        <div>
                            Logs ({model.logs.length})
                            <pre>
                                {
                                    JSON.stringify(model.logs, null, 4)
                                }
                            </pre>
                        </div>

                    </div>;
                };
            })
        }
    </div>
);

DataView.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataView;
