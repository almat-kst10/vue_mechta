import Routing from './index.vue';

export const routes = [
    {
        path: '', 
        component: () => import('./market-place/index.vue'),
        name: 'main'
    },
];

export {Routing}