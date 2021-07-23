import { generateValidEmail } from './utils/user/generateEmails';
import { IValidRequest } from './utils/user/interfaces';
import {
  invalidUserRequest,
  signInUserInvalidRequest,
  signInUserValidRequest,
  validUserRequest,
  updateUserValidRequest,
} from './utils/user/requests';
import { doPostRequest, doPutRequest } from './utils/doRequests';

//Sign up
it('The user router test suite works', function () {
  expect(true).toEqual(true);
});

it('Returns a 201 when valid input is provided when you are signing up', async function () {
  const response = await doPostRequest('/api/signup', validUserRequest);
  expect(response.status).toEqual(201);
});

it('returns a cookie when valid input is provided when signing up', async function () {
  //deep copy to avoid messing up the original
  const validUserRequest2: IValidRequest = JSON.parse(
    JSON.stringify(validUserRequest)
  );
  validUserRequest2.email = generateValidEmail();
  const response = await doPostRequest('/api/signup', validUserRequest2);
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('Returns a 400 when invalid input is provided when you are signing up', async function () {
  const response = await doPostRequest('/api/signup', invalidUserRequest);
  expect(response.status).toEqual(400);
});

it('Returns a 400 when no input is provided when you are signing up', async function () {
  const response = await doPostRequest('/api/signup', {});
  expect(response.status).toEqual(400);
});

it('Returns a 400 when the input contains an email already in user', async function () {
  await doPostRequest('/api/signup', validUserRequest);
  const response = await doPostRequest('/api/signup', validUserRequest);
  expect(response.status).toEqual(400);
});
//////////////////////////////////////////////////////////////////////////////////////////
//Login
it('returns a 200 when valid input is provided when signing in', async function () {
  const user = await doPostRequest('/api/signup', validUserRequest);
  const response = await doPostRequest('/api/signin', signInUserValidRequest);
  expect(response.status).toEqual(200);
});

it('returns a cookie when valid input is provided when signing in', async function () {
  await doPostRequest('/api/signup', validUserRequest);
  const response = await doPostRequest('/api/signin', signInUserValidRequest);
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('Returns a 400 when invalid input is provided when signing in', async function () {
  const response = await doPostRequest('/api/signin', signInUserInvalidRequest);
  expect(response.status).toEqual(400);
});

it('Returns a 400 when no input is provided when signing in', async function () {
  const response = await doPostRequest('/api/signin', {});
  expect(response.status).toEqual(400);
});
//////////////////////////////////////////////////////////////////////////////////////////
//Log out
it('returns a 200 when valid input is provided when signing out', async function () {
  await doPostRequest('/api/signup', validUserRequest);
  const response = await doPostRequest('/api/signout', signInUserValidRequest);
  expect(response.status).toEqual(200);
});

it('returns a expired out cookie when signing out', async function () {
  await doPostRequest('/api/signup', validUserRequest);
  const response = await doPostRequest('/api/signout', signInUserValidRequest);
  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
//////////////////////////////////////////////////////////////////////////////////////////
//Update
it('Returns a 401 when trying to update when not authorized', async function () {
  const response = await doPutRequest('/api/user', updateUserValidRequest);
  expect(response.status).toEqual(401);
});
