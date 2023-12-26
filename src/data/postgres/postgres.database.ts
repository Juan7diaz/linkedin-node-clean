import "reflect-metadata"
import { DataSource, EntitySchema } from 'typeorm';

interface Options {
  DB_HOST: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_PORT: number
  DB_DATABASE: string
  ENTITIES: EntitySchema[]
}

export class Postgres {

  static connectDatabase: DataSource;

  static async connect(options: Options) {

    const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, ENTITIES } = options

    try {

      this.connectDatabase = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_DATABASE,
        entities: ENTITIES,
        synchronize: true,
      });

      await this.connectDatabase.initialize()

    } catch (error) {
      console.log("PostgreSQL connecting error")
      throw error
    }
  }

}

