
import layout from '@/layout'

const asyncRoutes = [
  {
    path: '/permission',
    redirect: '/permission/user',
    hidden: true
  },

  {
    path: '/permission',
    component: layout,
    children: [
      {
        path: 'page',
        name: 'permission-page',
        component: () => import('@/views/permission/page.vue'),
        meta: {
          icon: 's-tools',
          title: '管理系统',
          roles: ['admin', 'superadmin']
        }
      }
    ]
  },

  {
    path: '/permission',
    component: layout,
    children: [
      {
        path: 'user',
        name: 'permission-user',
        component: () => import('@/views/permission/user.vue'),
        meta: {
          icon: 'menu',
          title: '权限浏览',
          roles: ['admin', 'superadmin', 'user']
        }
      }
    ]
  },

  {
    path: '/permission',
    component: layout,
    children: [
      {
        path: 'super',
        name: 'permission-super',
        component: () => import('@/views/permission/super.vue'),
        meta: {
          icon: 'user-solid',
          title: '超级管理',
          roles: ['superadmin']
        }
      }
    ]
  },

  {
    path: '/page1',
    component: layout,
    children: [
      {
        path: '',
        name: 'page1',
        meta: {
          icon: 'location',
          title: 'page1'
        },
        component: () => import('@/views/page1')
      }
    ]
  },

  {
    path: '/page2',
    component: layout,
    children: [
      {
        path: '',
        name: 'page2',
        meta: {
          icon: 'picture',
          title: 'page2'
        },
        component: () => import('@/views/page2')
      }
    ]
  },

  { path: '*', hidden: true, redirect: '/404' }
]

export default asyncRoutes
