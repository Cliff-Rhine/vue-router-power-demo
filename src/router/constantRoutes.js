
import layout from '@/layout'

// Usually store pages that do not require permission.
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login')
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/',
    name: 'home',
    hidden: true,
    redirect: '/document'
  },
  {
    path: '/document',
    component: layout,
    children: [
      {
        path: '',
        name: 'document',
        component: () => import('@/views/document'),
        meta: {
          icon: 's-order',
          title: '参考文档'
        }
      }
    ]
  }
]

export default constantRoutes
