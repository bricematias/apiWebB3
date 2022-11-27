const request = require('supertest');
const app = require('../app');

describe('get users endpoint', () => {
    it('should return collection of users', async () => {
        const resp = await request(app).get('/users');
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('data');
        expect(resp.body).toHaveProperty('success');
        expect(resp.body.success).toBeTruthy();
        expect(resp.body.data).toHaveLength(3);
    })});