import { Task, User } from "@prisma/client"
import app from "../app";
import request from "supertest";
import { prisma } from "../config/prisma-client";

describe('Given the tasks resources', () => {
  let user: User

  beforeAll(async () => {
    user = await prisma.user.create({
      data:{
        name: 'Jhon Doe',
        email: 'contact@jhondoe.com'
      }
    })
  })

  afterAll(async () => {
    await prisma.task.deleteMany()
    await prisma.user.deleteMany()
  })

  describe('GET /tasks', () => {
    let tasks: Task[]

    beforeAll(async () => {
      await prisma.task.createMany({
        data: [
          {
            title: 'My first task',
            description: 'Description for my first task',
            userId: user.id
          },
          {
            title: 'My second task',
            description: 'Description for my second task',
            userId: user.id
          }
        ]
      })

      tasks = await prisma.task.findMany({})
    })

    it('should be able to list all tasks', async() => {
      const response = await request(app).get('/tasks')

      expect(response.status).toBe(200)
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(tasks))
    })
  })

  describe('POST /tasks', () => {
    it('should be able to create a new task', async () => {
      const response = await request(app).post('/tasks').send({
        userId: user.id,
        title: 'My first task',
        description: 'Description for my first task'
      })

      const taskInDatabase = await prisma.task.findUnique({
        where: {
          id: response.body.id
        }
      })

      expect(response.status).toBe(201)
      expect(taskInDatabase).toBeTruthy()
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(taskInDatabase))
    })
  })
})