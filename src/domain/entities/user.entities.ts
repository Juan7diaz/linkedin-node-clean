
export class UserEntity {

  private constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string[],
    public img?: string[],
  ) { }

}
