export type BirthDate = { day: number; month: number; year: number };

interface UserData {
  username: string;
  email: string;
  birthDate: BirthDate;
  gender: string;
}

export interface Register extends UserData {
  password: string;
}

export interface User extends UserData {
  _id: string;
  joinDate: Date;
}

export type RegisterErrors = {
  [field: string]: string;
};

export type LoginErrors = {
  [field: string]: string;
};

export type Login = {
  username: string;
  password: string;
};
