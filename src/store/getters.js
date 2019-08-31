const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  userId: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  projects: state => state.user.projects,

  permissionRouters: state => state.permission.routers,
  sidebarRouters: state => state.permission.asyncRouters,
  groupRouters: state => state.user.routers,

  errorLogs: state => state.errorLog.logs
}

export default getters
