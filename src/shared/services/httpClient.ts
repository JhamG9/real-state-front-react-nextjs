import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Aquí puedes agregar tokens de autenticación, logging, etc.
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log(`[HTTP REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[HTTP REQUEST ERROR]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[HTTP RESPONSE] ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[HTTP RESPONSE ERROR]', error);
        
        // Manejo global de errores
        if (error.response?.status === 401) {
          // Redirect to login or refresh token
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }
}

// Singleton instance
export const httpClient = new AxiosHttpClient();

// Factory function para crear instancias específicas si es necesario
export const createHttpClient = (baseURL?: string): HttpClient => {
  return new AxiosHttpClient(baseURL);
};