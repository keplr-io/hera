import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import ViewRoute from './DataView';

export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: ViewRoute(store),
    childRoutes: []
});

export default createRoutes;
