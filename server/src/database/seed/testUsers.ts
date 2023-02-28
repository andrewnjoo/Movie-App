import { User } from '@prisma/client';

export type TestUser = Omit<User, 'id'>;

const testUsers: TestUser[] = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password1',
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: 'password2',
  },
  {
    name: 'Cindy',
    email: 'cindy@example.com',
    password: 'password3',
  },
];

export default testUsers;
