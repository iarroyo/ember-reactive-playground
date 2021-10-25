import Service from '@ember/service';

export default class ApiHttpClientService extends Service {
  async DELETE(url, headers, signal) {
    return this.fetch(url, 'DELETE', headers, undefined, signal);
  }
  async HEAD(url, headers, signal) {
    return this.fetch(url, 'HEAD', headers, undefined, signal);
  }
  async GET(url, headers, signal) {
    return this.fetch(url, 'GET', headers, undefined, signal);
  }
  async POST(url, headers, body, signal) {
    return this.fetch(url, 'POST', headers, body, signal);
  }
  async PUT(url, headers, body, signal) {
    return this.fetch(url, 'PUT', headers, body, signal);
  }

  async fetch(url, method = 'GET', headers = {}, body, signal) {
    const _headers = { ...headers };

    const response = await fetch(url, {
      method: method,
      headers: _headers,
      body: body ? JSON.stringify(body) : null,
      signal: signal,
    });

    if (response.ok) {
      return this.getResponseByContentType(response);
    } else {
      return Promise.reject(response);
    }
  }

  async getResponseByContentType(response) {
    const responseType = response.headers.get('content-type');
    if (responseType) {
      if (responseType.indexOf('application/json') !== -1) {
        try {
          return await response.json();
        } catch (error) {
          return response;
        }
      } else if (
        new RegExp('application/ms-excel|application/octet-stream').test(
          responseType
        )
      ) {
        return await response.blob();
      }
    }
    return response;
  }
}
