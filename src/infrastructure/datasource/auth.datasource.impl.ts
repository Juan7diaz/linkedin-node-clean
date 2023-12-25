import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { email, name, password } = registerUserDto;

    try {

      //1. verificar que el correo existe

      //2. encriptar la password

      //3. mapear la respuesta a nuestra entidad

      //4.

      return new UserEntity('1', "Juan", "Juan@google.com", ['Admin'])

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()

    }


  }
}