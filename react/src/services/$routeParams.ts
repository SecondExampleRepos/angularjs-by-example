// react/src/services/$routeParams.ts

export class RouteParamsService {
  // This service is a placeholder for route parameters.
  // In a real application, this would be populated with logic to handle route parameters.
  // For now, it is left empty as per the instructions.

  private params: { [key: string]: string } = {};

  constructor() {
    this.initializeParams();
  }

  private initializeParams() {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.forEach((value, key) => {
      this.params[key] = value;
    });
  }

  public getParam(key: string): string | undefined {
    return this.params[key];
  }

  public setParam(key: string, value: string) {
    this.params[key] = value;
    this.updateUrl();
  }

  private updateUrl() {
    const queryParams = new URLSearchParams(this.params).toString();
    const newUrl = `${window.location.pathname}?${queryParams}`;
    window.history.replaceState({}, '', newUrl);
  }
