import axios from 'axios';
import { storage } from '../utils';
import { apiUrl } from './url';
import { UserData } from '../../entities/interfaces';

export function getApplications(userData: UserData) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token ?? storage.getToken()}`,
    },
  };

  return axios.get(`${apiUrl}/api/applications`, config).then((res) => {
    return res.data;
  });
}

export function getApplicationById(
  id: any,
  userData: UserData
): Promise<Application> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token ?? storage.getToken()}`,
    },
  };

  return axios.get(`${apiUrl}/api/applications/${id}`, config).then((res) => {
    return res.data;
  });
}

export function updateApplication({ id, application, userData }: any) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token ?? storage.getToken()}`,
    },
  };

  const body = {
    panel: application.panel,
    isGraded: application.isGraded,
  };

  console.log(body);

  return axios
    .put(`${apiUrl}/api/applications/${id}`, body, config)
    .then((res) => res.data);
}

export function gradeApplication({ id, grades, userData }: any) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token ?? storage.getToken()}`,
    },
  };

  return axios
    .put(`${apiUrl}/api/applications/${id}/grades`, grades, config)
    .then((res) => res.data);
}

export function setGradeStatus({ id, graded, userData }: any) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token ?? storage.getToken()}`,
    },
  };

  const body = { graded };

  return axios
    .put(`${apiUrl}/api/applications/${id}/grade-status`, body, config)
    .then((res) => res.data);
}

export function softDeleteApplication({ id, userData }: any) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.token ?? storage.getToken()}`,
    },
  };

  return axios
    .delete(`${apiUrl}/api/applications/${id}/`, config)
    .then((res) => res.data);
}
