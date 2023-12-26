import { envs } from './config'
import { User } from './data/postgres/models'
import { Postgres } from './data/postgres/postgres.database'
import { AppRoutes } from './presentetion/routes'
import { Server } from "./presentetion/server"

(()=>{ main() })()

async function main() {

  //conecta la base de dato
  Postgres.connect({
    DB_DATABASE: envs.DB_DATABASE,
    DB_HOST: envs.DB_HOST,
    DB_PORT: envs.DB_PORT,
    DB_PASSWORD: envs.DB_PASSWORD,
    DB_USERNAME: envs.DB_USERNAME,
    ENTITIES: [ User ]
  })

  // inicializa el servidor
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })

  server.start()

}

