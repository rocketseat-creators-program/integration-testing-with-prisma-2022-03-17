import { User } from "@prisma/client";
import request from "supertest";
import { prisma } from "../config/prisma-client";

import app from '../app'

describe('Given the users resources', () => {
  let users: User[]

  describe('GET /users', () => {
    beforeAll(async() => {
      await prisma.user.createMany({
        data: [
          {
            name: "Jhon Doe",
            email: "contact@jhondoe.com"
          },
          {
            name: "Jana Doe",
            email: "contact@janadoe.com"
          }
        ]
      })

      users = await prisma.user.findMany()
    })

    it('should be able to list all users', async () => {
      const response = await request(app).get('/users')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(users)
    })
  });

  describe('POST /users', () => {
    afterEach(async () => {
      await prisma.user.deleteMany()
    })

    it('should be able throw an error when the user is already registered', async () => {
      const data = {
        name: 'Jhon Doe',
        email: 'contact@jhondoe.com'
      }

      await request(app).post('/users').send(data)

      const response = await request(app).post('/users').send(data)

      expect(response.status).toBe(409)
      expect(response.body.message).toBe(`The email ${data.email} is already registered.`)
    })
  })
})