//this is for avoiding duplicates emails
export function generateValidEmail(): string {
  return `test${Math.floor(Math.random() * 10)}@test.com`;
}
