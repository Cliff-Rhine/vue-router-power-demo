<template>
  <div>
    <el-menu :default-active="activeMenu">
      <cl-side-item
        v-for="(route, index) in permission_routes"
        :key="index"
        :item="route"
      ></cl-side-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),

    activeMenu () {
      window.console.log('active menu is ' + this.$route.path)
      return this.$route.path
    }
  },
  components: {
    'cl-side-item': () => import('./side-item')
  },
  mounted: function () {
    // window.console.log(this.item.path)
  }
}
</script>
