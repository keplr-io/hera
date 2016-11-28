import React, { PropTypes } from 'react';
import Timeseries from 'components/Timeseries';
import ModelGraph from 'components/ModelGraph';
import Loader from 'halogen/BounceLoader';

import './style.scss';

const DashboardComponent = props => (
    <div>{
        props.models.length ? (
            props.models.map(model => (
                <div key={model.key} className='model-container'>
                    <div className='progress-container'>
                        <div className='progressbar'
                            style={{
                                width: `${
                                    (model.epoch / model.data.params.nb_epoch) * 100
                                }%`
                            }}
                        >
                        </div>
                        <span className='progress-text'>
                            Epoch {model.epoch + 1}/{model.data.params.nb_epoch}
                        </span>
                    </div>
                    <div className='model-graph-container'>
                      <ModelGraph modelConfig={model.data.modelJson} />
                    </div>
                    <div>
                        <div className='model-key'>{model.key}</div>
                        {
                            model.killScheduled ? (
                                <div className='kill-scheduled-msg'>
                                    Will stop after this epoch.
                                </div>
                            ) : (
                                <div onClick={
                                        () => props.scheduleKill(model.key)
                                    }
                                  className='stop-btn'>
                                    Stop training
                                </div>
                            )
                        }
                        
                    </div>
                    {model.data.params.metrics.map(metricKey =>
                      <div key={metricKey}>
                        <div className='metric-header'>
                            <div className='graph-toggle-btn'
                              onClick={
                                () => props.toggleGraph(getGraphKey(model.key, metricKey))
                              }>
                              {props.collapsedMap[getGraphKey(model.key, metricKey)] ? '+' : '‒' }
                            </div>
                            <div className='metric-key'>{metricKey}</div>
                        </div>
                        {
                            props.collapsedMap[getGraphKey(model.key, metricKey)]
                                ? ''
                                : (
                                <div>
                                  <Timeseries
                                    className='model-plot'
                                    graphKey='static'
                                    modelKey={model.key}
                                    metricKey={metricKey}
                                    fillGraph />
                                  <Timeseries
                                    className='model-plot'
                                    graphKey='active'
                                    modelKey={model.key}
                                    metricKey={metricKey} />
                                </div>
                            )
                        }

                      </div>
                    )}
                </div>
            ))
        ) : (
            <div className='wait-screen'>
                <div className='wait-message'>Ready for models</div>
                <div className='wait-loader'>
                    <Loader color='#4286f4' size='60px' />
                </div>
            </div>
        )
    }</div>
);

DashboardComponent.propTypes = {
    models: PropTypes.array,
    collapsedMap: PropTypes.object,
    toggleGraph: PropTypes.func,
    stopTraining: PropTypes.func
};

export default DashboardComponent;

function getGraphKey(modelKey, metricKey) {
    return `${modelKey}@${metricKey}`;
}
