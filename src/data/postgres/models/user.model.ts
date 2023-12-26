import { EntitySchema } from "typeorm"

export const User = new EntitySchema({
  name: "user",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    roles: {
      type: String,
      enum: ["ROLE_USER", "ROLE_ADMIN"]
    },
    imgage: {
      type: String,
    }
  },
})

export default User