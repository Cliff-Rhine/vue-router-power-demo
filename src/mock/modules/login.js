
import Mock from 'mockjs'

export default params => Mock.mock(() => {
  const { username } = params
  const result = {
    code: 1,
    msg: '登录成功'
  }

  if (username === 'user') {
    result.data = {}
    result.data.token = 'hsghd23h2g3j2'
  } else if (username === 'admin') {
    result.data = {}
    result.data.token = 'hasjdah2h1jjh'
  } else if (username === 'superadmin') {
    result.data = {}
    result.data.token = 'sdah4kh3k4jh3'
  } else {
    result.code = 0
    result.msg = '用户密码错误'
  }

  return result
})
