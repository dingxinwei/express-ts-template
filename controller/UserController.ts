import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  BodyParam,
  Res,
  Session,
} from "routing-controllers";
import UserModel from "../models/user";
import { Response } from "express";

@Controller()
export class UserController {
  @Get("/users")
  getAll() {
    return "This action returns all users";
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/users")
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/users/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }

  @Post("/users/login")
  async login(
    @BodyParam("username") userName: string,
    @BodyParam("password") password: string,
    @Session() session: any,
    @Res() response: Response
  ) {
    const user = await UserModel.findOne({ userName, password });

    if (user) {
      session.username = userName;
      return response.send({
        code: 200,
        msg: "登录成功",
      });
    } else {
      return response.send({
        code: 400,
        msg: "用户不存在或密码错误",
      });
    }
  }
}
