export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  profilePicture: string;
  gender: 'M' | 'F' | 'O' | 'X';
}

export interface Address {
  id: number;
  streetAddress: string;
  apartmentAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}
