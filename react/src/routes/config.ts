import HomeController from '../components/HomeController';
import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import ShowService from '../services/ShowService';

const routes = [
    {
        path: '/',
        exact: true,
        component: HomeController,
    },
    {
        path: '/premieres',
        exact: true,
        component: PremieresController,
        loadData: async () => {
            try {
                const shows = await ShowService.getPremieres();
                return { shows };
            } catch (error) {
                console.error('Failed to load premieres', error);
                return { shows: [] };
            }
        },
    },
    {
        path: '/search',
        exact: true,
        component: SearchController,
    },
    {
        path: '/search/:query',
        exact: true,
        component: SearchController,
    },
    {
        path: '/popular',
        exact: true,
        component: PopularController,
        loadData: async () => {
            try {
                const shows = await ShowService.getPopular();
                return { shows };
            } catch (error) {
                console.error('Failed to load popular shows', error);
                return { shows: [] };
            }
        },
    },
    {
        path: '/view/:id',
        exact: true,
        component: ViewController,
        loadData: async (params: { id: string }) => {
            try {
                const show = await ShowService.get(params.id);
                return { show };
            } catch (error) {
                console.error('Failed to load show', error);
                return { show: null };
            }
        },
    },
    {
        path: '*',
        redirectTo: '/',
    },
];

export default routes;
