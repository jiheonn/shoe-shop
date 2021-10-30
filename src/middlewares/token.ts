import * as express from 'express'
import * as jwt from 'jsonwebtoken'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    decoded: any
  }
}

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // 인증 완료
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
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
