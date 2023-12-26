import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @Column()
  img: number

  @Column({enum: ['USER_ROLE', 'ADMIN_ROLE']})
  roles: string

}

export default User