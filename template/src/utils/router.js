import router from '../router'

export const changeRouteToLoginPage = () => {
  const route = { name: 'login' }
  router.push(route)
}

export const changeRoute = path => {
  const route = { name: path }
  router.push(route)
}
