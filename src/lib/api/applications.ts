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
    console.log(res.data);
    return res.data;
  });
}
