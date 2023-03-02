import { User } from '@prisma/client';

export type TestUser = Omit<User, 'id'>;

const testUsers: TestUser[] = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'C0mplexP@ss',
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: 'Str0ngPassw0rd!',
  },
  {
    name: 'Cindy',
    email: 'cindy@example.com',
    password: 'P@ssword1234',
  },
];

export default testUsers;
