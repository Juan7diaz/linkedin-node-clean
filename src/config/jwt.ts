import jwt from "jsonwebtoken"

export class JwtAdapter {

  static generateToken(payload: object, duration: string = '2h'): Promise<string | null> {

    return new Promise((resolve) => {

      jwt.sign(payload, "SEED", { expiresIn: duration }, (err, token) => {

        if (err) return resolve(null)

        resolve(token!)

      })
    })

  }

}
