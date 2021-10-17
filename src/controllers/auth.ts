import * as express from 'express'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    flash: any
    session: any
  }
}

const displayLogin = (req: express.Request, res: express.Response) => {
  const message = req.flash('error')
  res.render('login', { message })
}
const logout = (req: express.Request, res: express.Response) => {
  req.session.destroy()
  res.redirect('/')
}

export default {
  displayLogin,
  logout,
}
