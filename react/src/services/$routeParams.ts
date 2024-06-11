// react/src/services/$routeParams.ts

class RouteParamsService {
  private params: { [key: string]: any } = {};

  constructor() {
    // Initialize with empty params
    this.params = {};
  }

  // Method to get a parameter by name
  getParam(name: string): any {
    return this.params[name];
  }

  // Method to set a parameter
  setParam(name: string, value: any): void {
    this.params[name] = value;
  }

  // Method to clear all parameters
  clearParams(): void {
    this.params = {};
  }

  // Method to update multiple parameters at once
  updateParams(newParams: { [key: string]: any }): void {
    this.params = { ...this.params, ...newParams };
  }
}

export default new RouteParamsService();