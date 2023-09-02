import axios from 'axios';

class Http<ResponseBodyType = any> {
  private _request: Http.Request;
  private _response: Http.Response<ResponseBodyType> | null = null;
  constructor(request: Http.Request) {
    this._request = request;
  }

  public async sendRequest() {
    const response = axios({
      method: this._request.method,
      url: this._request.method,
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });

    this._response = new Http.Response(response.status, response.statusText, response.headers, response.data);

    return this._response;
  }

}

interface KeyValueStr { key: string, value: string }

namespace Http {
  export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    PATCH = 'PATCH',
  }

  export type HttpHeadersType = KeyValueStr;
  export type HttpUrlParam = KeyValueStr;
  export type HttpUrlParams = HttpUrlParam[];
  export interface UrlInterface {
    scheme: string;
    host: string;
    port: number;
    path: string;
    params?: HttpUrlParams;
  }

  export class Url {
    private _scheme: UrlInterface['scheme'];
    private _host: UrlInterface['host'];
    private _port?: UrlInterface['port'];
    private _path: UrlInterface['path'];
    private _params: HttpUrlParams;
    constructor(config: UrlInterface) {
      this._scheme = config.scheme;
      this._host = config.host;
      this._port = config.port;
      this._path = config.path;
      this._params = config.params || [];
    }

    public generate() {
      const port = this._port ? `:${this._port}` : '';
      let params = this._params?.length ? '?' : '';
      for (const param of this._params) {
        params += params === '?' ? '' : '&';
        params += `${param.key}=${param.value}`;
      }
      return `${this._scheme}://${this._host}${port}/${this._path}/${params}`;
    }
  }

  export class Request<BodyType = any> {
    private _method: HttpMethods;
    private _url: string;
    private _headers: HttpHeadersType;
    private _body: BodyType;

    constructor(method: HttpMethods, url: Url, headers: HttpHeadersType, body: BodyType) {
      this._method = method;
      this._url = url.generate();
      this._headers = headers;
      this._body = body;
    }

    public get method() {
      return this._method;
    }

    public get url() {
      return this._url;
    }

    public get headers() {
      return this._headers;
    }

    public get body() {
      return this._body;
    }
  }
  
  export class Response<BodyType = any> {
    private _status: number;
    private _statusText: string;
    private _headers: HttpHeadersType;
    private _body: BodyType;

    constructor(status: number, statusText: string, headers: HttpHeadersType, body: BodyType) {
      this._status = status;
      this._statusText = statusText;
      this._headers = headers;
      this._body = body;
    }

    public get status() {
      return this._status;
    }

    public get statusText() {
      return this._statusText;
    }

    public get headers() {
      return this._headers;
    }

    public get body() {
      return this._body;
    }

    get isFailed(): boolean {
      return this._status > 300;
    }

    get isSuccess(): boolean {
      return this._status < 400;
    }
  }
}

export default Http;
