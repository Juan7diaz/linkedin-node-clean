import "reflect-metadata"
import { DataSource } from 'typeorm';

interface Options {
  DB_HOST: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_PORT: number
  DB_DATABASE: string
  ENTITIES: any[]
}

export class Postgres {

  static async connect(options: Options) {

    const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, ENTITIES } = options

    try {

      const connectDatabase = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_DATABASE,
        entities: ENTITIES,
        synchronize: true,
      });

      await connectDatabase.initialize()

    } catch (error) {
      console.log("PostgreSQL connecting error")
      throw error
    }
  }

}

