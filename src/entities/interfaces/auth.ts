export interface RegisterCredentials {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export interface LoginCredentials {
  email: String;
  password: String;
}

export interface UserData {
  firstName?: String;
  lastName?: String;
  token: String;
  role?: String;
}
