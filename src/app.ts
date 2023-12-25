import { envs } from './config'
import { Server } from "./presentetion/server"

(()=>{ main() })()

async function main() {

  const server = new Server({
    port: envs.PORT
  })
  server.start()

}

