import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController";
import { PORT } from "./config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
app.use(cookieParser());
app.use(cors())
app.use(
  session({
    secret: "secret", // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
useExpressServer(app, {
  controllers: [UserController],
}).listen(PORT);
