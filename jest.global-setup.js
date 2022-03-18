import util from 'util'
import { config } from 'dotenv'
import crypto from 'crypto'
import { exec } from 'child_process'

const prismaBinary = './node_modules/.bin/prisma'

export default async () => {
  console.info('\nMontando suíte de testes...')

  config({ path: '.env.test' })

  const execSync = util.promisify(exec)

  global.__SCHEMA__ = `test_${crypto.randomUUID()}`

  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${global.__SCHEMA__}`

  await execSync(`${prismaBinary} migrate deploy`)

  console.info('Suíte pronta. Iniciando testes...\n')
}