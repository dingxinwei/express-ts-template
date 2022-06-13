import * as express from 'express';
import * as createError from 'http-errors';
import * as multer from 'multer';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser'
import * as path from 'path';
import user from './routes/user';
import './mongodb/db';
import { SERVER_HOST, PORT } from './config';

const app = express();

app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 60 // 设置 session 的有效时间，单位毫秒
  }
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + uniqueSuffix)
  }
});
const upload = multer({ storage });
app.use(cookieParser());

app.use(function (req, res, next) {   //设置跨域响应头                    
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "token, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public/upload')));
app.post('/upload', upload.single('userPhoto'), function (req: any, res: any) {
  res.json({
    url: `http://${SERVER_HOST}:${PORT}/static/${req.file.filename}`
  })
});
app.use('/user', user)
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(res.locals.message);
});

app.listen(PORT);