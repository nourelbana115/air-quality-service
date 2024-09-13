import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

const axiosCall = async <T>(
  config: AxiosRequestConfig,
  retries: number = 3
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axios(config);

    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  } catch (error: any) {
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);
      return axiosCall(config, retries - 1); // Retry on failure
    }

    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        success: false,
        message: error.response.statusText,
      };
    } else if (error.request) {
      return {
        data: {} as T,
        status: 0,
        success: false,
        message: 'No response from server',
      };
    } else {
      return {
        data: {} as T,
        status: 0,
        success: false,
        message: error.message,
      };
    }
  }
};

export default axiosCall;
