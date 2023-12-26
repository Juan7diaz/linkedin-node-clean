import { Postgres } from "./postgres/postgres.database"

class Manager {

  static manager() {
    Postgres.connectDatabase.manager.findOne(UserModel, { where: { email } })
  }

}