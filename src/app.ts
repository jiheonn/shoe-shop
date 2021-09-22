import * as createError from 'http-errors'
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as dotenv from 'dotenv'
import * as flash from 'connect-flash'

import indexRouter from './routes/index'
import productRouter from './routes/product'
import brandRouter from './routes/brand'
import authRouter from './routes/auth'

import configureSession from './config/session'
import configurePassport from './config/passport'

dotenv.config()

const app = express()

configureSession(app)
configurePassport(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(flash())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/brands', brandRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404))
  }
)

// error handler
app.use((err: any, req: express.Request, res: express.Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
