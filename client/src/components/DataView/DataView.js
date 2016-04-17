import React from 'react';

export const DataView = (props) => (
    <div>
        <h2>
            Data
        </h2>
        <div>
            <pre>
                {
                    JSON.stringify(props.data, null, 4)
                }
            </pre>
        </div>
    </div>
);

DataView.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataView;
