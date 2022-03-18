import { Prisma } from "@prisma/client"
import { Router } from "express"
import { prisma } from "../config/prisma-client"

const userHandlers = Router()

userHandlers.get('/users', async(request, response) => {
  const users = await prisma.user.findMany()

  response.json(users)
})

userHandlers.post('/users', async(request, response) => {
  const { email, name } = request.body

  try {
    const user = await prisma.user.create({
      data:{
        name,
        email
      }
    })

    response.status(201).json(user)
  } catch (error) {
    //https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === 'P2002') {
        return response.status(409).json({ message: `The email ${email} is already registered.`})
      }
    }

    response.status(500).json({ message: 'Internal server error.'})
  }
})

export { userHandlers }