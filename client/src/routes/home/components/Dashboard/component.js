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
                {model.data.params.metrics.map((metricKey) =>
                  <div key={metricKey}>{
                    model.epochs.map(epoch => (
                      <Timeseries
                        key={epoch}
                        epoch={epoch}
                        modelKey={model.key}
                        metricKey={metricKey} />
                    ))
                  }</div>
                )}
            </div>
        ))
    }</div>
);

DashboardComponent.propTypes = {
    models: PropTypes.array
};

export default DashboardComponent;
