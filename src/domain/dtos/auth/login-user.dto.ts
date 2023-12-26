import { Validators } from "../../../config";

export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string,
  ) { }

  static Loggear(object: { [key: string]: any }): [string?, LoginUserDto?] {

    const { email, password } = object

    // validamos los que no viene en el body
    if (!email) return ["missing email"];
    if (!Validators.email.test(email)) return ["email is no valid"]
    if (!password) return ["missing password"]
    if (password.length < 6) return ["password too short"]

    return [undefined, new LoginUserDto(email, password)];
  }

}


