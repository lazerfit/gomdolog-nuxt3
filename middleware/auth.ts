export default defineNuxtRouteMiddleware((to, from) => {
  const store = useHeaderStore();
  if (import.meta.client) return
  if (store.isAdmin) {
    if(to.fullPath !== from.fullPath) {
      return navigateTo(to.fullPath);
    }
  } else {
    const error = createError({
      statusCode: 403,
      statusMessage: 'Access Denied',
      message: 'You do not have permission to access this page.'
    })
    return abortNavigation(error)
  }
})