<template>
  <li v-if="!item.hidden">
    <router-link v-if="!item.submenu && getOnlyOneChild(item.children, item)" :to="onlyChild.path">
      <el-menu-item>{{onlyChild.meta.title}}</el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        <i :class="icon"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <side-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      ></side-item>
    </el-submenu>
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
      return 'el-icon-' + this.item.meta.icon
    }
  },
  data: function () {
    return {
      onlyChild: null
    }
  },
  methods: {
    getOnlyOneChild: function (children = [], parent) {
      // filter children
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          return true
        }
      })

      window.console.log(showingChildren)
      if (showingChildren.length === 0) {
        this.onlyChild = parent
        return true
      } else if (showingChildren.length === 1) {
        this.onlyChild = showingChildren[0]
        return true
      }
    }
  }
}
</script>
