import { doPostRequest } from './utils/doRequests';
//all the test that you dont know where should be can be here
it('The miscellaneous test suite works', function () {
  expect(true).toEqual(true);
});

it('We get an not found error when we look for an page / route that doesnt exists', async function () {
  const response = await doPostRequest('/sdaawea', {});
  expect(response.status).toEqual(404);
});
