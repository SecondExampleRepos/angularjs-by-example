// react/src/services/$routeParams.ts

interface RouteParams {
  [key: string]: any;
}

class RouteParamsService {
  private params: RouteParams;

  constructor() {
    this.params = {};
  }

  getParams(): RouteParams {
    return this.params;
  }

  setParams(params: RouteParams): void {
    this.params = params;
  }
}

const routeParamsService = new RouteParamsService();
export default routeParamsService;