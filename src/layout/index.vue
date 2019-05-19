<template>
  <el-container>
    <cl-header></cl-header>
    <el-container>
      <cl-side-bar></cl-side-bar>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-container>
    <el-footer height="0"></el-footer>
  </el-container>
</template>

<script>
export default {
  components: {
    'cl-header': () => import('./components/header'),
    'cl-side-bar': () => import('./components/sidebar')
  }
}
</script>
