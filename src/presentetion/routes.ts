import { Router } from "express";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    // definir todas las rutas principales
    router.use("/api/auth", AuthRoutes.routes)
    // router.use("/api/user")
    // router.use("/api/product")
    // router.use("/api/clients")
    // router.use("/api/orders")


    return router
  }

}


