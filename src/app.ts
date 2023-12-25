import { Server } from "./presentetion/server"

(()=>{ main() })()

async function main() {

  const server = new Server({
    port: 8080
  })
  server.start()

}

