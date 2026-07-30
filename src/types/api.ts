export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
  totalPages: number;
  currentPage: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
