export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface TransportStrategy {
  send<T, BODY_TYPE>(
    endpoint: string,
    method: string,
    options?: {
      baseUrl?: string;
      headers?: Record<string, string>;
      body?: BODY_TYPE;
      onProgress?: (percent: number) => void;
    },
  ): Promise<ApiResponse<T> | ApiError>;
}
