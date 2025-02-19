import AppConfig from "common/AppConfig";
import FormData from "form-data";
import { BaseDataApi } from "models";

const METHOD_GET = "get";
const METHOD_POST = "post";
const METHOD_PUT = "put";
const METHOD_DELETE = "delete";
const METHOD_PATCH = "patch";

const sleep = (timeout = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const handleClearDataEndReload = () => {
  // clear data and reload
};

const handleError = (
  message: string,
  apiData: any,
  withoutToastError?: boolean
) => {
  // Handle toast error
  // check if need to clear data and reload
};

function fetchWithRetry<T = any>(
  uri: string,
  fetchOptions: any = {},
  retries = 0,
  serviceBaseUrl?: string,
  withoutToastError?: boolean
): Promise<BaseDataApi<T>> {
  let apiUrl = "";
  if (serviceBaseUrl !== undefined) {
    apiUrl = serviceBaseUrl + uri;
  } else {
    apiUrl = AppConfig.apiBaseUrl + uri;
  }
  return fetch(apiUrl, fetchOptions)
    .then((res) => {
      return res
        .json()
        .then(async (data) => {
          if (res.status !== 200) {
            handleError(data?.error, { uri, fetchOptions }, withoutToastError);
            return { ...data, statusCode: res.status };
          }
          if (data.data) {
            return { ...data, statusCode: res.status };
          }
          if (data.success || data.message) {
            return {
              data: data.data,
              success: data.success,
              message: data.message,
              statusCode: res.status,
            };
          }
          return { data, statusCode: res.status };
        })
        .catch((err) => {
          return { message: err, statusCode: res.status };
        });
    })
    .catch(async (err) => {
      const msg = err.message || err || "";
      if (msg === "Failed to fetch") {
        if (retries > 0) {
          await sleep();
          return fetchWithRetry<T>(
            uri,
            fetchOptions,
            retries - 1,
            serviceBaseUrl,
            withoutToastError
          );
        }
      }
      if (!msg.includes("aborted")) {
        handleError(msg, { uri, fetchOptions }, withoutToastError);
      }
      return {
        message: msg,
      };
    });
}

async function requestAPI<T = any>(
  method: string,
  uri: string,
  body?: any,
  serviceBaseUrl?: string,
  controller?: AbortController,
  h?: any,
  withoutToastError?: boolean
): Promise<BaseDataApi<T>> {
  // TODO: handle refresh token before call api
  // Build API header
  let headers: any = {
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  };
  if (body instanceof FormData) {
    // headers['Content-Type'] = 'multipart/form-data';
    // headers = {};
  } else {
    headers["Content-Type"] = "application/json";
  }

  // Get access token and attach it to API request's header
  try {
    const accessToken = "";
    if (accessToken != null) {
      headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("No token is stored");
    }
  } catch (e: any) {
    console.log(e);
  }

  if (h) {
    headers = {
      ...headers,
      ...h,
    };
  }

  // Build API body
  let contentBody: any = null;
  if (
    method.toLowerCase() === METHOD_POST ||
    method.toLowerCase() === METHOD_PUT ||
    method.toLowerCase() === METHOD_DELETE ||
    method.toLowerCase() === METHOD_PATCH
  ) {
    if (body) {
      if (body instanceof FormData) {
        contentBody = body;
      } else {
        contentBody = JSON.stringify(body);
      }
    }
  }
  // Construct fetch options
  const fetchOptions: RequestInit = {
    method,
    headers,
    body: contentBody,
  };
  if (uri === "auth/refresh" || uri === "auth/login") {
    fetchOptions.credentials = "include";
  }
  if (!!controller) {
    fetchOptions.signal = controller.signal;
  }
  // Run the fetching
  // if (!navigator.onLine) {
  //   return Promise.reject(Error("No internet connection"));
  // }

  return fetchWithRetry<T>(
    uri,
    fetchOptions,
    0,
    serviceBaseUrl,
    withoutToastError
  );
}

const Caller = {
  get<T>(
    url: string,
    baseUrl?: string,
    controller?: AbortController,
    withoutToastError?: boolean,
    headers?: any
  ) {
    return requestAPI<T>(
      METHOD_GET,
      url,
      undefined,
      baseUrl,
      controller,
      headers,
      withoutToastError
    );
  },

  post<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController,
    h?: any
  ) {
    return requestAPI<T>(METHOD_POST, url, data, baseUrl, controller, h);
  },

  patch<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController
  ) {
    return requestAPI<T>(METHOD_PATCH, url, data, baseUrl, controller);
  },

  put<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController
  ) {
    return requestAPI<T>(METHOD_PUT, url, data, baseUrl, controller);
  },

  delete<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController
  ) {
    return requestAPI<T>(METHOD_DELETE, url, data, baseUrl, controller);
  },
};

export default Caller;
