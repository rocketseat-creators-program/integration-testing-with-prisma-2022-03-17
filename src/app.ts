import express  from 'express'
import { taskHandlers } from './handlers/task-handlers'
import { userHandlers } from './handlers/user-handlers'

const app = express()
app.use(express.json())

app.use(userHandlers)
app.use(taskHandlers)

export default app