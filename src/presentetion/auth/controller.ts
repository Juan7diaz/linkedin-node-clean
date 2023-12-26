import { Request, Response } from "express"
import { CustomError, RegisterUserDto } from "../../domain"
import { AuthRepository } from '../../domain/repositories/Auth.respository';
import { JwtAdapter } from "../../config";
import { Postgres } from "../../data/postgres/postgres.database";
import { UserModel } from "../../data/postgres/models";


export class AuthController {

  constructor(
    private readonly AuthRepository: AuthRepository
  ) {
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }

  registerUser = (req: Request, res: Response) => {

    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.AuthRepository.register(registerUserDto!)
      .then(async (user) => res.json({ user, token: await JwtAdapter.generateToken({ id: user.id }) }))
      .catch(error => this.handleError(error, res))

  }

  loginUser = (req: Request, res: Response) => {
    res.json("login user controller")

  }

  getUsers = async (req: Request, res: Response) => {
    try{
      const users = await Postgres.connectDatabase.getRepository(UserModel).find()
      return res.json({users, user: req.body.user})
    }catch(error){
      res.status(500).json({error: "Internal Server Error"})
    }
  }


}

