import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { Postgres } from '../../data/postgres/postgres.database';
import { UserModel } from '../../data/postgres/models';


export class AuhtMiddleware {

  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.header("authorization")
    if (!authorization) return res.status(401).json({ error: "No token provider" })
    if (!authorization.startsWith("Bearer ")) return res.status(401).json({ error: "No token provider" })

    const token = authorization.split(" ")[1] || ''

    try {
      const payload = await JwtAdapter.validateToken<{ id: number }>(token)
      if (!payload) return res.status(401).json({ error: "Invalid token" })

      const user = await await Postgres.connectDatabase.getRepository(UserModel).findOne({ where: { id: payload.id } })
      if (!user) return res.status(401).json({ error: "Invalid token" })

      req.body.user = payload
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" })
    }

    console.log("paso por el middleware")

    next()
  }

}