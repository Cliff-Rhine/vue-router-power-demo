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
export default {
  computed: {
    name: function () {
      return 'name'
    }
  },
  methods: {
    logout: function () {

    }
  }
}
</script>
