import { HTTPErrror, TimeoutError } from "./errors";
import type { RequestOptions } from "./types";

export class API {
  static baseUrl = "http://localhost:5174";
  static headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone, // Add browser's timezone
  };
  static timeout = 30000;

  static setHeaders(headers: HeadersInit) {
    this.headers = { ...this.headers, ...headers };
  }

  static buildUrl(
    pathName: string,
    params?: Record<string, string | number | undefined>
  ): string {
    const url = new URL(`${this.baseUrl}${pathName}`);
    if (params) {
      url.search = new URLSearchParams(
        Object.entries(params).filter(([_, value]) => value !== undefined) as [
          string,
          string
        ][]
      ).toString();
    }
    return url.toString();
  }

  static async request<T>(
    pathName: string,
    options: RequestOptions<T> = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, params, body } = options;

    const url = this.buildUrl(pathName, params);
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...this.headers,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    requestOptions.signal = controller.signal;

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new HTTPErrror(response.status, response.statusText);
      }

      const contentType = response.headers.get("Content-Type") || "";
      return this.parseResponse<T>(response, contentType);
    } catch (error) {
      if (controller.signal.aborted) {
        throw new TimeoutError(`Fetch timed out after ${this.timeout} ms`);
      }

      if (error instanceof HTTPErrror) {
        console.error(`HTTP Error: ${error.status} - ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  static parseResponse<T>(response: Response, contentType: string): Promise<T> {
    const parsers = new Map<string, () => Promise<any>>([
      ["application/json", () => response.json()],
      ["text/plain", () => response.text()],
      ["application/xml", () => response.text()], // Example: XML can be parsed as text
      ["text/html", () => response.text()], // Example: HTML can also be parsed as text
    ]);

    for (const [type, parser] of parsers) {
      if (contentType.includes(type)) {
        return parser();
      }
    }

    // Default to returning the raw response if no parser matches
    return Promise.resolve(response as unknown as T);
  }

  static get<T>(url: string, options?: RequestOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "GET" });
  }

  static post<T>(url: string, options?: RequestOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "POST" });
  }

  static put<T>(url: string, options?: RequestOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "PUT" });
  }

  static delete<T>(url: string, options?: RequestOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "DELETE" });
  }
}
