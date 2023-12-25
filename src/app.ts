import { envs } from './config'
import { AppRoutes } from './presentetion/routes'
import { Server } from "./presentetion/server"

(()=>{ main() })()

async function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })

  server.start()

}

