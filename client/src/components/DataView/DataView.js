import React from 'react';

import { TimeSeries, TimeRange } from 'pondjs';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts';

export const DataView = (props) => (
    <div>
        {
            Object.keys(props.data).map((modelId, idx) => {
                const model = props.data[modelId];
                if (model) {
                    const series = new TimeSeries({
                        name: 'loss-chart',
                        columns: ['time', 'loss'],
                        points: model.metricTimeseries.loss
                    });

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
                            <ChartContainer timeRange={series.timerange()} width={800}>
                                <ChartRow height="200">
                                    <YAxis id="axis1" label="AUD" min={0.5} max={1.5} width="60" type="linear" format="$,.2f"/>
                                    <Charts>
                                        <LineChart key="1" axis="axis1" series={series}/>
                                        <LineChart key="2" axis="axis2" series={series}/>
                                    </Charts>
                                    <YAxis id="axis2" label="Euro" min={0.5} max={1.5} width="80" type="linear" format="$,.2f"/>
                                </ChartRow>
                            </ChartContainer>

                        </div>
                        <div>
                            Logs ({model.metricTimeseries.loss.length})
                            <pre>
                                {
                                    JSON.stringify(model.metricTimeseries.loss, null, 4)
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
