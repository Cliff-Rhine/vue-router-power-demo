import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const moduleFiles = require.context('./modules', false, /\.js$/)

const modules = moduleFiles.keys().reduce((modules, modeluePath) => {
  const moduleName = modeluePath.replace(/^\.\/(.*)\.\w+$/, '$1')

  const value = moduleFiles(modeluePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
