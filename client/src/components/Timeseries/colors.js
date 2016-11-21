export const defaultColor = '#4286f4';
export const metricColorMap = {
    'acc': '#9be55e',
    'loss': '#f46242'
};

export const getMetricColor = (metricKey) => (metricColorMap[metricKey] || defaultColor);
