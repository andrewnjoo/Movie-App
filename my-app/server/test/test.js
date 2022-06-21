/* eslint-disable no-undef */
const server = require('../server');
const request = require('supertest');
// const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {
    it('should return a Hello World', async () => {
        return request(server)
            .get('/api/')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.message).toEqual('Hello World!');
            });
    });
})