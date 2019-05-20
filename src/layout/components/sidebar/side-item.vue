<template>
  <li v-if="!item.hidden">
    <router-link :to="resolve()">
      <el-menu-item
        :index="index"
      >
        <i :class="icon"></i>
        <span>{{item.children[0].meta.title}}</span>
      </el-menu-item>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'side-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon: function () {
      return 'el-icon-' + this.item.children[0].meta.icon
    }
  },
  data: function () {
    return {
      index: '',
      onlyChild: null
    }
  },
  methods: {
    resolve: function () {
      const baseUrl = this.item.path
      let childUrl
      if (this.item.children) {
        childUrl = '/' + this.item.children[0].path
      } else {
        childUrl = ''
      }
      const path = baseUrl + childUrl
      this.index = path
      window.console.log(path)
      return path
    }
  }
}
</script>
