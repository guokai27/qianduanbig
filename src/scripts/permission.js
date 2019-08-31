import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/scripts/auth'

NProgress.configure({ showSpinner: false })

// permission judge function
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.meta.title) {
    document.title = to.meta.title + ' - QuickV'
    next()
  }

  if (to.path.match(/^\/dashboard\/\w{32}$/)) {
    next()
    return
  }

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(response => {
          const roles = response.data.roles
          // console.log(store.getters.groupRouters)
          router.addRoutes(store.getters.groupRouters)
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.permissionRouters)
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
