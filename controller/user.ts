import UserModel from '../models/user';
class User {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username, password });
    if (user) {
      req.session.username = user.username;
      res.json({
        code: 200,
        msg: '登录成功'
      });
    } else {
      res.json({
        code: 400,
        msg: '用户不存在或密码错误'
      });
    }
  }
}

export default new User();