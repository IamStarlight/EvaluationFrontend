const Mock = require('mockjs');

const data = Mock.mock({
  username: '@cname',
  id: '@id',
  password: '111111',
  signature: '@sentence',
  //name: 'John Doe',
  //roles: 3
})

module.exports = [
  {
    url: '/vue-admin-template/change/userInfo',
    type: 'get',
    response: config => {
      const userInfo = {
        username: data.username,
        id: data.id,
        password:data.password,
        signature: data.signature,
        //name: data.name
        //roles: data.roles
      };
      return {
        code: 20000,
        data: {
          userInfo
        }
      }
    }
  },

  {
    url: '/vue-admin-template/change/changepassword',
    type: 'post',
    response: config => {
      const { newPassword } = config.body;

      // 在此处根据需要进行相关逻辑判断和处理
      // 例如，可以将新密码保存到某个变量或数据库中

      return {
        code: 20000,
        data: {
          message: "密码修改成功"
        }
      };
    }
  },
];
