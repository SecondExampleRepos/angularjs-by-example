// Converted from src/app.routes.js

import { lazy } from 'react';

// Lazy load components
const HomeController = lazy(() => import('../components/HomeController'));
const PremieresController = lazy(() => import('../components/PremieresController'));
const SearchController = lazy(() => import('../components/SearchController'));
const PopularController = lazy(() => import('../components/PopularController'));
const ViewController = lazy(() => import('../components/ViewController'));

// Define routes
const routes = [
    {
        path: '/',
        exact: true,
        component: HomeController,
    },
    {
        path: '/premieres',
        component: PremieresController,
    },
    {
        path: '/search',
        component: SearchController,
    },
    {
        path: '/search/:query',
        component: SearchController,
    },
    {
        path: '/popular',
        component: PopularController,
    },
    {
        path: '/view/:id',
        component: ViewController,
    },
];

export default routes;
