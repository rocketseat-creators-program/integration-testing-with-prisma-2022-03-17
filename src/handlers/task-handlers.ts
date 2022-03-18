import { Router } from "express"
import { prisma } from "../config/prisma-client"

const taskHandlers = Router()

taskHandlers.get('/tasks', async(request, response) => {
  const tasks = await prisma.task.findMany()

  response.json(tasks)
})

taskHandlers.post('/tasks', async(request, response) => {
  const { userId, title, description } = request.body

  const task = await prisma.task.create({
    data:{
      title,
      userId,
      description
    }
  })

  response.status(201).json(task)
})

export { taskHandlers }