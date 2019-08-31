import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/public/Layout' // 整体布局

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/Redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { title: 'QuickV - 大屏可视化开发工具' },
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/AuthRedirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ErrorPage401'),
    hidden: true
  },
  {
    path: '',
    redirect: '/project/all',
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/views/account/UserProfile'),
        meta: { title: '编辑资料', noCache: true, affix: true }
      }
    ],
    hidden: true
  },
  {
    path: '/preview/:hash',
    component: () => import('@/views/dashboard/Preview'),
    hidden: true
  },
  {
    path: '/dashboard/:hash',
    component: () => import('@/views/dashboard/Preview'),
    hidden: true
  },
  {
    path: '/edit/dashboard/:hash',
    component: () => import('@/views/dashboard/Designer'),
    hidden: true
  }
]

export const permissionRouterMap = [
  {
    path: '/template',
    component: Layout,
    redirect: '/template/index',
    meta: {
      title: 'template',
      icon: 'component',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        force: true,
        component: () => import('@/views/dashboard/Template.vue'),
        name: 'TemplateManage',
        meta: {
          title: '模板管理',
          roles: ['admin'], // or you can only set roles in sub nav
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/material',
    component: Layout,
    meta: {
      title: 'material',
      icon: 'excel',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        force: true,
        component: () => import('@/views/dashboard/Material.vue'),
        name: 'MaterialCsv',
        meta: {
          title: '数据管理',
          roles: ['admin'], // or you can only set roles in sub nav
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/bi',
    component: Layout,
    meta: {
      title: 'BI',
      icon: 'example',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: '',
        force: true,
        component: () => import('@/views/dashboard/Todo.vue'),
        name: 'BI',
        meta: {
          title: 'BI分析',
          roles: ['admin'], // or you can only set roles in sub nav
          noCache: true,
          affix: false
        }
      }
    ]
  },
  {
    path: '/subpolicy',
    component: Layout,
    meta: {
      title: 'subpolicy',
      icon: 'star',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: '',
        force: true,
        component: () => import('@/views/dashboard/Todo.vue'),
        name: 'SubPolicy',
        meta: {
          title: '辅助决策',
          roles: ['admin'], // or you can only set roles in sub nav
          noCache: true,
          affix: false
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // 不能用history模式，虽然没有#号，但找不到资源，会报404错误
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
