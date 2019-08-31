import router from '@/router'
import { loginByUsername, logout } from '@/api/login'
import { getUserInfo, updateAccount } from '@/api/user'
import { setToken, removeToken, setUserId, removeUserId } from '@/scripts/auth'
const generate = require('nanoid/generate')

const user = {
  state: {
    id: '',
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    routers: [],
    projects: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, id) => {
      state.id = id
    },
    SET_USER_PROJECTS: (state, projects) => {
      state.projects = projects
    },
    SET_USER_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          commit('SET_USER_ID', response.id)
          setUserId(response.id)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        const projectRouters = [
          {
            path: '/project',
            component: () => import('@/views/public/Layout'),
            name: 'project',
            meta: {
              title: '我的大屏',
              icon: 'list'
            },
            children: [
              {
                path: 'all',
                component: () => import('@/views/dashboard/Manage'),
                name: 'all',
                meta: { title: '全部大屏' }
              },
              {
                path: 'ungrouped',
                component: () => import('@/views/dashboard/Manage'),
                name: 'ungrouped',
                meta: { title: '未分组' }
              }
            ]
          }
        ]

        getUserInfo().then(response => {
          if (!response) {
            reject(new Error('Verification failed, please login again.'))
          }

          const user = response.data
          if (user.roles && user.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', user.roles)
          } else {
            reject(new Error('getInfo: roles must be a non-null array!'))
          }

          const projects = user.projects || {}
          for (let key in projects) {
            projectRouters[0].children.push({
              path: key,
              component: () => import('@/views/dashboard/Manage'),
              name: key,
              meta: { title: projects[key] }
            })
          }

          commit('SET_USER_ROUTERS', projectRouters)
          commit('SET_USER_PROJECTS', projects)
          commit('SET_NAME', user.username)
          commit('SET_AVATAR', user.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    addProject ({ commit, state }, projectName) {
      let projects = Object.assign(state.projects)
      let key = generate('1234567890abcdef', 6)
      projects[key] = projectName

      commit('SET_USER_PROJECTS', projects)

      const newProjectRouters = [
        {
          path: '/project',
          component: () => import('@/views/public/Layout'),
          name: 'project',
          meta: {
            title: '我的大屏',
            icon: 'list'
          },
          children: [
            {
              path: key,
              component: () => import('@/views/dashboard/Manage'),
              name: key,
              meta: { title: projectName }
            }
          ]
        }
      ]
      router.addRoutes(newProjectRouters)
    },

    renameProject ({ commit, state }, payload) {
      const projects = Object.assign(state.projects, payload)

      commit('SET_USER_PROJECTS', projects)
    },

    deleteProject ({ commit, state }, projectKey) {
      let projects = Object.assign(state.projects)
      delete projects[projectKey]

      commit('SET_USER_PROJECTS', projects)
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    UpdateAccount ({ commit }, account) {
      return new Promise(resolve => {
        updateAccount(account).then(response => {
          resolve(response)
        })
      })
    },

    // 动态修改权限
    ChangeRoles ({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          commit('SET_ROLES', response.roles)
          commit('SET_NAME', response.name)
          commit('SET_AVATAR', response.avatar)
          commit('SET_INTRODUCTION', response.introduction)
          dispatch('GenerateRoutes', response) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
