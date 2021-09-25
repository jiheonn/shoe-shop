import * as express from 'express'

// TODO: types 분리 필요
declare module 'express' {
  export interface Request {
    isAuthenticated(): boolean
  }
}

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

export const isNotLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}
