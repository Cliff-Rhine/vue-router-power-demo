
import Mock from 'mockjs'

export default params => Mock.mock(() => {
  if (params.token === 'hsghd23h2g3j2') {
    return {
      code: 1,
      msg: 'success',
      data: {
        name: 'user',
        role: 'user'
      }
    }
  } else if (params.token === 'hasjdah2h1jjh') {
    return {
      code: 1,
      msg: 'success',
      data: {
        name: 'admin',
        role: 'admin'
      }
    }
  } else if (params.token === 'sdah4kh3k4jh3') {
    return {
      code: 1,
      msg: 'success',
      data: {
        name: 'superadmin',
        role: 'superadmin'
      }
    }
  } else {
    return {
      code: 0,
      msg: 'token无效'
    }
  }
})
