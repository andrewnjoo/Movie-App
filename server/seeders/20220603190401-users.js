const faker = require('faker');
// eslint-disable-next-line no-unused-vars
const users = [...Array(10)].map((user) => 

{
  return {
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(8),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
