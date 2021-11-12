import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    user: any
  }
}

dotenv.config()

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // 인증 완료
  try {
    // decoded
    req.user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    return next()
  } catch (error) {
    // 인증 실패
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      })
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    })
  }
}

export default { verifyToken }
