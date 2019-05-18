<template>
  <el-container>
    <cl-header></cl-header>
    <cl-aside></cl-aside>
    <el-footer height="0"></el-footer>
  </el-container>
</template>

<script>
export default {
  components: {
    'cl-header': () => import('./modules/cl-header'),
    'cl-aside': () => import('./modules/cl-aside')
  }
}
</script>
