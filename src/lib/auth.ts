// @ts-ignore
import { configureAuth } from 'react-query-auth';
import { getUserProfile, register, login, logout } from './api/user';
import { storage } from './utils';
import { LoginCredentials, RegisterCredentials } from '../entities/interfaces';

async function handleUserResponse(data: any) {
  storage.setToken(data?.token);
}

async function userFn() {
  const user = await getUserProfile();
  return user ?? null;
}

async function loginFn(loginData: LoginCredentials) {
  const response = await login(loginData);
  await handleUserResponse(response);
  return response;
}

async function registerFn(registerData: RegisterCredentials) {
  const response = await register(registerData);
  await handleUserResponse(response);
  return response;
}

async function logoutFn() {
  await logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });
