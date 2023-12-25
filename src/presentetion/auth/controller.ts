import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain"
import { AuthRepository } from '../../domain/repositories/Auth.respository';


export class AuthController {

  constructor(
    private readonly AuthRepository: AuthRepository
  ) {
  }

  registerUser = (req: Request, res: Response) => {

    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.AuthRepository.register(registerUserDto!)
      .then( user => res.json(user))
      .catch( error => res.status(500).json(error))

  }

  loginUser = (req: Request, res: Response) => {
    res.json("login user controller")

  }

}

