// react/src/services/$routeParams.ts

class RouteParamsService {
  private params: { [key: string]: any } = {};

  constructor() {
    // Initialize with empty params
  }

  getParams(): { [key: string]: any } {
    return this.params;
  }

  setParams(newParams: { [key: string]: any }): void {
    this.params = { ...this.params, ...newParams };
  }

  clearParams(): void {
    this.params = {};
  }
}

export default new RouteParamsService();