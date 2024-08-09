import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import HomeController from '../components/HomeController';
import ShowService from '../services/ShowService';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  fetchInitialData?: (path?: string) => Promise<any>;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomeController,
    exact: true,
  },
  {
    path: '/premieres',
    component: PremieresController,
    fetchInitialData: () => ShowService.getPremieres(),
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
    fetchInitialData: () => ShowService.getPopular(),
  },
  {
    path: '/view/:id',
    component: ViewController,
    fetchInitialData: (path = '') => {
      const id = path.split('/').pop();
      return id ? ShowService.get(id) : Promise.resolve(null);
    },
  },
];

export default routes;
