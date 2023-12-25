import { Router } from "express";


export class AuthRoutes {

  static get routes(): Router {
    const router = Router();

    // define los metodos que va a poseer la ruta de api/auth
    router.post("/login", (req, res)=>{
      res.json("login")
    })

    router.post("/register", (req, res)=>{
      res.json("register")
    })

    return router
  }

}


