import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { CustomError } from '../errors/custom.error';
import { AuthRepository } from '../repositories/Auth.respository';

interface RegisterUserUseCase {
  execute: (registerUserDto: RegisterUserDto) => Promise<any>;
}

interface UserToken {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

type SingToken = (payload: object, duration?: string) => Promise<string | null >


export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SingToken
  ) { }


  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

    // crear el usuario
    const user = await this.authRepository.register(registerUserDto)

    //token
    const token = await this.signToken({ id: user.id })
    if (!token) throw CustomError.internalServer("Error generating token")

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }

  }

}

