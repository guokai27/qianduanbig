const TokenKey = 'Auth-Token'
const UserKey = 'User-ID'
// const Storage = window.localStorage
const Storage = sessionStorage

export function getToken () {
  return Storage.getItem(TokenKey)
}

export function setToken (token) {
  return Storage.setItem(TokenKey, token)
}

export function removeToken () {
  return Storage.removeItem(TokenKey)
}

export function getUserId () {
  return Storage.getItem(UserKey)
}

export function setUserId (id) {
  return Storage.setItem(UserKey, id)
}

export function removeUserId () {
  return Storage.removeItem(UserKey)
}
