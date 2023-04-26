class UserService {
  async createUser({name, password}){
    //...数据库操作逻辑
    return "用户数据写入成功"
  }
}
module.exports = new UserService()