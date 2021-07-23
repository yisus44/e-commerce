import { app } from '../../app';
import request from 'supertest';

export async function doPostRequest(url: string, requestBody?: any) {
  return await request(app).post(url).send(requestBody);
}

export async function doPutRequest(url: string, requestBody?: any) {
  return await request(app).put(url).send(requestBody);
}
