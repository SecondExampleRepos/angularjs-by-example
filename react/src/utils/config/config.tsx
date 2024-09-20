// Converted from src/app.routes.js

import { RouteObject } from 'react-router-dom';
import Home from '../../components/controllers/HomeController';
import Premieres from '../../components/controllers/PremieresController';
import Search from '../../components/controllers/SearchController';
import Popular from '../../components/controllers/PopularController';
import View from '../../components/controllers/ViewController';
import ShowService from '../../services/ShowService';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/premieres',
        element: <Premieres />,
        loader: async () => {
            const shows = await ShowService.getPremieres();
            return { shows };
        },
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/search/:query',
        element: <Search />,
    },
    {
        path: '/popular',
        element: <Popular />,
        loader: async () => {
            const shows = await ShowService.getPopularShows();
            return { shows };
        },
    },
    {
        path: '/view/:id',
        element: <View />,
        loader: async ({ params }) => {
            const show = await ShowService.getShow(Number(params.id));
            return { show };
        },
    },
];

export default routes;
