import { CustomError, UserEntity } from "../../domain";

export class UserMapper {

  static userEntityFromObject(object: { [key:string]: any } ){

    const {id, name, password, roles, email } = object

    if(!id) throw CustomError.badRequest("Missing id")
    if(!name) throw CustomError.badRequest("Missing name")
    if(!email) throw CustomError.badRequest("Missing email")
    if(!roles) throw CustomError.badRequest("Missing role")
    if(!password) throw CustomError.badRequest("Missing email")

    return new UserEntity(
      id,
      name,
      email,
      password,
      roles,
    )
  }


}

