import React from 'react'

export const Counter = (props) => (
    <div>
        <h2>
            Data
        </h2>
        <div>
            <pre>
                {
                    JSON.stringify(this.props.data, null, 4)
                }
            </pre>
        </div>
    </div>
);

Counter.propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
};

export default Counter;
