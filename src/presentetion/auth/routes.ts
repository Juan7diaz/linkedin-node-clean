import { Router } from "express";
import { AuthController } from "./controller";


export class AuthRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new AuthController()

    // define los metodos que va a poseer la ruta de api/auth
    router.post("/login", controller.loginUser)
    router.post("/register", controller.registerUser)

    return router
  }

}


