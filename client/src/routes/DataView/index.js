import { injectReducer } from '../../store/reducers';

export default (store) => ({
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
          and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
              dependencies for bundling   */
            const DataView = require('./containers/DataViewContainer').default;
            const reducer = require('./modules/data').default;

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'data', reducer });

            /*  Return getComponent   */
            cb(null, DataView);

        /* Webpack named bundle   */
        }, 'view');
    }
});
