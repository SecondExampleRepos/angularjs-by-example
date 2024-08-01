import HomeController from '../components/HomeController';
import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import ShowService from '../services/ShowService';

const routes = [
    {
        path: '/',
        component: HomeController,
    },
    {
        path: '/premieres',
        component: PremieresController,
        resolve: {
            shows: async () => {
                return await ShowService.getPremieres();
            }
        }
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
        resolve: {
            shows: async () => {
                return await ShowService.getPopular();
            }
        }
    },
    {
        path: '/view/:id',
        component: ViewController,
        resolve: {
            show: async (params: { id: string }) => {
                return await ShowService.get(params.id);
            }
        }
    },
    {
        path: '*',
        redirectTo: '/',
    }
];

export default routes;
