const request = require('supertest');
const express = require('express');
const app = require('../index'); // محتاج تعمل export للـ app من index.js

describe('Health Check Endpoints', () => {
  it('GET /healthz should return 200 OK', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Healthy");
  });

  it('GET /started should return 200 OK', async () => {
    const res = await request(app).get('/started');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Started");
  });
});
