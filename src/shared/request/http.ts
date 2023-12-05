const enum StatusCode {
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

class Http {
    private baseURL

    constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    private _handleRequest(config: any) {
      const options = {
        headers: config.headers || {},
        method: config.method || 'GET',
        body: config.body,
      };
  
      if (config.withoutToken) {
        delete options.headers.Authorization;
      }
  
      return options;
    }
  
    private _handleRequestError(error: any) {
      return Promise.reject(error);
    }
  
    private _handleResponse(respons: any): void | Promise<void> {
      if (!respons.ok) {
        throw respons;
      }
  
      return respons.json();
    }
  
    private _handleResponseError(error: any) {
      const { response } = error;
  
      if (response) {
        this.handleError(response.status);
      }
  
      return Promise.reject(error);
    }
  
    // Handle global app errors
    protected handleError(status: any) {
      switch (status) {
        case 401:
          // TODO unauthorized logic
          break;
        case 403:
          // TODO forbidden logic
          break;
        case 500:
          // TODO internal server error logic
          break;
        default:
          break;
      }
    }
  
    request(url: string, config: any) {
      return this._baseRequest(url, config);
    }
  
    private _baseRequest(url: string, config: any) {
      const options = this._handleRequest(config);
      
      return fetch(`${this.baseURL}${url}`, options)
        .then((response) => this._handleResponse(response))
        .catch((error) => error);
    }
  }
  
  export const http = new Http('https://test-frontend.stage.mechta.market/delivery/check' as string);