import { type AxiosRequestConfig } from "axios";
import customRequest, { Transformer } from "./helpers/customRequest";
// import { store } from "../store";

const baseUrl = "https://fakestoreapi.com/"

class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  private getHeaders() {
    // Get token from Redux store

    return {
      "Content-Type": "application/json",
    };
  }

  get<T, R = T>(
    path: string,
    options?: AxiosRequestConfig,
    transform?: Transformer<T, R>
  ) {
    return this.request<T, R>(
      `${this.url}/${path}`,
      { method: "GET", ...options },
      transform
    );
  }

  post<T, R = T>(
    path: string,
    body: Record<string, unknown>,
    options?: AxiosRequestConfig,
    transform?: Transformer<T, R>
  ) {
    return this.request<T, R>(
      `${this.url}/${path}`,
      {
        method: "POST",
        data: body,
        ...options,
      },
      transform
    );
  }

  patch<T, R = T>(
    path: string,
    body: Record<string, unknown>,
    options?: AxiosRequestConfig,
    transform?: Transformer<T, R>
  ) {
    return this.request<T, R>(
      `${this.url}/${path}`,
      {
        method: "PATCH",
        data: body,
        ...options,
      },
      transform
    );
  }

  put<T, R = T>(
    path: string,
    body: Record<string, unknown>,
    options?: AxiosRequestConfig,
    transform?: Transformer<T, R>
  ) {
    return this.request<T, R>(
      `${this.url}/${path}`,
      {
        method: "PUT",
        data: body,
        ...options,
      },
      transform
    );
  }

  delete<T, R = T>(
    path: string,
    body?: Record<string, unknown>,
    options?: AxiosRequestConfig,
    transform?: Transformer<T, R>
  ) {
    return this.request<T, R>(
      `${this.url}/${path}`,
      {
        method: "DELETE",
        data: body,
        ...options,
      },
      transform
    );
  }

  private request: typeof customRequest = async (path, options, transform) => {
    try {
      const response = await customRequest(
        path,
        {
          ...options,
          headers: {
            ...this.getHeaders(),
            ...(options?.headers || {}),
          },
        },
        transform
      );

      return response;
    } catch (error: any) {
      console.log(error)
      if (error.response?.status === 401) {
        // console.log("Unauthorized! Logging out...");
        // store.dispatch(logout()); // Logout user
        // // window.location.href = "/login"; // Redirect to login page
      }
      throw error;
    }
  };
}

export const apiInstance = new Api(baseUrl || "");

export default Api;
