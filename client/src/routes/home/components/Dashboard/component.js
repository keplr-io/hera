import React, { PropTypes } from 'react';
import Timeseries from 'components/Timeseries';
import ModelGraph from 'components/ModelGraph';

import './style.scss';

const DashboardComponent = (props) => (
    <div>{
        props.models.map(model => (
            <div key={model.key}>
                <div>{model.key}</div>
                <div>
                  <ModelGraph modelConfig={model.data.modelJson} />
                </div>
                {model.data.trainConfig.metrics.map(metricKey => (
                    <Timeseries
                      key={metricKey}
                      modelKey={model.key}
                      metricKey={metricKey} />
                ))}
            </div>
        ))
    }</div>
);

DashboardComponent.propTypes = {
    models: PropTypes.array
};

export default DashboardComponent;
