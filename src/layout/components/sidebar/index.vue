<template>
  <div>
    <el-menu>
      <cl-side-item
        v-for="item in permission_routes"
        :key="item.path"
        :item="item"
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
      return this.$route.path
    }
  },
  components: {
    'cl-side-item': () => import('./side-item')
  }
}
</script>
