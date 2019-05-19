<template>
  <el-header>
    <div></div>
    <el-row type="flex" align="middle">
      <span>你好，{{name}}</span>
      <span class="cl-logout-button" @click="logout"><i class="el-icon-switch-button"></i></span>
    </el-row>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(res => {
        window.console.log('logout...')
        // has bug, if go / and error
        this.$router.push('/login')
      })
    }
  }
}
</script>
