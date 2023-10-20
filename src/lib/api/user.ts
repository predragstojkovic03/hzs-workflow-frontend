import axios, { AxiosRequestConfig } from 'axios';
import { storage } from '../utils';
import { apiUrl } from './url';
import {
  LoginCredentials,
  RegisterCredentials,
} from '../../entities/interfaces';

const handleError = (error: any) => {
  return Promise.reject(error.response?.data);
};

export async function getUserProfile() {
  if (!storage.getToken()) return null;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storage.getToken()}`,
    },
  };

  return axios
    .get(`${apiUrl}/api/users/me`, config)
    .then((res) => res.data)
    .catch(handleError);
}

export async function login(loginData: LoginCredentials) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios
    .post(`${apiUrl}/api/users/login`, loginData, config)
    .then((res) => res.data)
    .catch(handleError);
}

export async function register(registerData: RegisterCredentials) {
  const config: AxiosRequestConfig<RegisterCredentials> = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios
    .post(`${apiUrl}/api/users/`, registerData, config)
    .then((res) => res.data)
    .catch(handleError);
}

export async function logout() {
  storage.clearToken();
}
