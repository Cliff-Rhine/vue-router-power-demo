<template>
  <el-container>
    <div class="wrap">
      <el-row>
        <el-button type="primary" @click="loginAsUser">登录为普通用户</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="loginAsAdmin">登录为管理员</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="loginAsSuperAdmin">登录为超级管理员</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" @click="loginAsFailed">登录为无效人员</el-button>
      </el-row>
    </div>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      loading: false
    }
  },
  methods: {
    login: function (parmas) {
      this.loading = true
      window.console.log('click login button')

      this.$store.dispatch('login', parmas).then(response => {
        this.loading = false

        if (response.code) {
          this.$router.push('/')
        } else {
          this.$notify({
            type: 'error',
            title: response.msg
          })
        }
      })
    },

    loginAsUser: function () {
      const parmas = {
        username: 'user',
        password: '123456'
      }
      this.login(parmas)
    },

    loginAsAdmin: function () {
      const parmas = {
        username: 'admin',
        password: '123456'
      }
      this.login(parmas)
    },

    loginAsSuperAdmin: function () {
      const parmas = {
        username: 'superadmin',
        password: '123456'
      }
      this.login(parmas)
    },

    loginAsFailed: function () {
      const parmas = {
        username: '123456',
        password: '123456'
      }
      this.login(parmas)
    }
  }
}
</script>
