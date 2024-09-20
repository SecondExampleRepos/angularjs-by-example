// Converted from src/app.routes.js

import { RouteObject } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';
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
            const shows = await ShowService.getPopular();
            return { shows };
        },
    },
    {
        path: '/view/:id',
        element: <View />,
        loader: async ({ params }) => {
            const show = await ShowService.get(params.id);
            return { show };
        },
    },
];

export default routes;
