import { Request, Response } from "express"
import { CustomError, LoginUser, RegisterUser, RegisterUserDto } from "../../domain"
import { AuthRepository } from '../../domain/repositories/Auth.respository';
import { JwtAdapter } from "../../config";
import { Postgres } from "../../data/postgres/postgres.database";
import { UserModel } from "../../data/postgres/models";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

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

    new RegisterUser(this.AuthRepository, JwtAdapter.generateToken)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))

  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.Loggear(req.body)

    if (error) return res.status(400).json({ error })

    new LoginUser(this.AuthRepository, JwtAdapter.generateToken)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))

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
