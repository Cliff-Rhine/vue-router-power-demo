
import Mock from 'mockjs'
import query from 'querystring'

const get = url => {
  const host = 'http://' + location.host + '/'
  const arg = new URL(url, host)
  const api = arg.pathname
  const params = query.parse(arg.searchParams.slice(1))
  return { api, params }
}

const post = (url, body) => {
  const api = url
  const params = JSON.parse(body)
  return { api, params }
}

Mock.mock(RegExp('/api/.*'), res => {
  const arg = (res.type === 'GET') ? get(res.url) : post(res.url, res.body)
  // window.console.log(arg)

  const moduleFiles = require.context('./modules', false, /\.js$/)
  const service = moduleFiles.keys().reduce((service, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    service[moduleName] = moduleFiles(modulePath).default
    return service
  }, {})
  const apiName = arg.api.replace(/^\/api\/(.*)$/, '$1')
  const program = service[apiName]
  if (program) {
    return program(arg.params)
  } else {
    return {
      code: 0,
      msg: 'there is no api for ' + apiName
    }
  }
  // window.console.log(service)
})
