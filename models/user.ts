import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  //文档结构: 属性名\属性值
  username: { type: String, default: "hahaha" },
  password: { type: String, select: false }, //select: false 表示当返回对象时，不包含该属性
});

const UserModel = mongoose.model("user", userSchema, "user");

export default UserModel;
