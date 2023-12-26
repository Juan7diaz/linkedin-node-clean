import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data/postgres/models";
import { Postgres } from '../../data/postgres/postgres.database';
import { BcryptAdapter } from '../../config/bcrypt';


type hashFunction  = ( password: string ) => string
type compareFunction  = ( password: string, hashed:string ) => boolean


export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hashPassword: hashFunction = BcryptAdapter.hash,
    private readonly comparePassword: compareFunction = BcryptAdapter.compare
  ){}


  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { email, name, password } = registerUserDto;

    try {
      //1. verificar que el correo existe
      const exist = await Postgres.connectDatabase.getRepository(UserModel).findOne({where: { email }})
      if( exist ) throw CustomError.badRequest("User already exists")

      //2. guardamos en base de datos
      const user =  await Postgres.connectDatabase.getRepository(UserModel).save({
        name:name,
        email:email,
        password: this.hashPassword(password),
        roles: "ROLE_ADMIN"
      })

      return new UserEntity(
        user.id as string,
        user.name,
        user.email,
        user.password,
        [user.roles],
        [user.img as string],
      )

    } catch (error) {

      if (error instanceof CustomError) {
        throw {
          statusCode: error.statusCode,
          message: error.message
        }
      }

      throw CustomError.internalServer()

    }

  }
}