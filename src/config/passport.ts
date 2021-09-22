import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import db_querys from '../db/querys'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    user: any
  }
}

export default app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // 로그인 성공했을 때 한 번만 실행
  passport.serializeUser((user, done) => {
    done(null, user.u_id) // deserializeUser로 user 전달
  })
  // 로그인에 성공하고, 페이지를 방문할 때마다 호출
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db_querys.selectUserInfo(id)
      done(null, user) // req.user 객체 생성
    } catch {
      done(null, false, {
        message: '서버의 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      })
    }
  })

  passport.use(
    new LocalStrategy(
      {
        session: true,
        usernameField: 'id', // form > input name 값
        passwordField: 'pw',
      },
      async (id, pw, done) => {
        try {
          // 회원정보 조회
          const user = await db_querys.selectUserInfo(id)

          // 회원정보가 없는 경우
          if (!user) {
            done(null, false, { message: '존재하지 않는 아이디입니다.' })
          }
          // 비밀번호가 일치하지 않는 경우
          // @ts-ignore
          if (user.u_pw !== pw) {
            done(null, false, {
              message: '비밀번호가 일치하지 않습니다.',
            })
          }
          done(null, user)
        } catch {
          done(null, false, {
            message: '서버의 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          })
        }
      }
    )
  )
}
