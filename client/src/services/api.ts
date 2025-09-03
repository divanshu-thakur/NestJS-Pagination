import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface PaginatedResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateUserDto {
  name: string;
  email: string;
}

const api = {
  getUsers: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse> => {
    const response = await axios.get(`${API_URL}/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  createUser: async (user: CreateUserDto): Promise<User> => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  },

  createBulkUsers: async (users: CreateUserDto[]): Promise<User[]> => {
    const response = await axios.post(`${API_URL}/users/bulk`, { users });
    return response.data;
  },
};

export default api; 