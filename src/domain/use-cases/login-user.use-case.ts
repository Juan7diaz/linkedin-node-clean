import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { CustomError } from '../errors/custom.error';
import { AuthRepository } from '../repositories/Auth.respository';

interface LoginUserUseCase {
  execute: (loginUserDto: LoginUserDto) => Promise<any>;
}

type SingToken = (payload: object, duration?: string) => Promise<string | null >

export class LoginUser implements LoginUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SingToken
  ) { }

  execute = async (loginUserDto: LoginUserDto) => {

    const user = await this.authRepository.login(loginUserDto)

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

  };

}

