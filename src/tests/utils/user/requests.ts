import { IValidRequest } from './interfaces';

export const validUserRequest: IValidRequest = {
  email: 'test@test.com',
  password: 'a really valid password',
  country: 'usa',
  age: 18,
};

export const invalidUserRequest = {
  email: 'fdafaw',
  password: 'no',
  country: '3',
};

export const signInUserValidRequest = {
  email: 'test@test.com',
  password: 'a really valid password',
};

export const signInUserInvalidRequest = {
  email: 'no',
  password: 'invalid',
};

export const updateUserValidRequest = {
  password: 'a really valid password 2',
  age: 23,
};
