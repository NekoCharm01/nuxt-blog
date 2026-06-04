import jwt from 'jsonwebtoken'

export type TokenPayload = {
  userId: number
}

export function generateToken(userId: number) {
  const payload: TokenPayload = { userId }
  const secretKey = useRuntimeConfig().jwtSecretKey
  const options: jwt.SignOptions = {
    expiresIn: '7d',
  }
  return jwt.sign(payload, secretKey, options)
}

export function verifyToken(token: string) {
  const secretKey = useRuntimeConfig().jwtSecretKey
  const { userId } = jwt.verify(token, secretKey) as TokenPayload
  return userId
}
