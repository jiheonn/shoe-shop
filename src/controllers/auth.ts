import * as express from 'express'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    flash: any
    session: any
  }
}

const displayLogin = (req: express.Request, res: express.Response) => {
  res.render('login', { message: req.flash('error') })
}

/*
    jsonwebtoken

    const login = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      where: {
        email: req.body.id,
      },
      raw: true,
    })

    if (!user) {
      req.flash('error', '존재하지 않는 아이디입니다.')
      res.redirect('/auth/login')
    }

    const verified = await verifyPassword(
      req.body.password,
      user.salt,
      user.password,
    )
    if (!verified) {
      req.flash('error', '비밀번호가 일치하지 않습니다.')
      res.redirect('/auth/login')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )
  }
*/

const logout = (req: express.Request, res: express.Response) => {
  req.session.destroy()
  res.redirect('/')
}

export default {
  displayLogin,
  logout,
}
