import pg from 'pg'

export default async () => {
  console.info('\nDeletando schema...')

  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL
  })

  await client.connect()
  await client.query(`DROP SCHEMA IF EXISTS "${global.__SCHEMA__}" CASCADE`)
  await client.end()

  console.info('Schema deletado.\n')
}