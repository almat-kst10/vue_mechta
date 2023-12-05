import Routing from './index.vue';

export const routes = [
    {
        path: '/home', 
        component: () => import('./market-place/index.vue'),
        name: 'main'
    },
];

export {Routing}