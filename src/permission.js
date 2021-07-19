import router from '@/router'
import {ADMIN_INFO_RESULT, MENUS_GENERATE} from '@/store/actions-types'
import {useAuthStore} from '@/store/store-auth'
import {useAsyncRouterStore} from '@/store/store-menu'

const whiteList = ['/login', '/auth-redirect']
const num0 = 0
const numN1 = -1


router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    const menu = useAsyncRouterStore()
    let token = auth.getAdminToken || localStorage.getItem('admin-token')
    if (token) {

        // 判断是否有token
        if (to.path === '/login') {
            // next({path: '/'})
            next()
        } else {
            const hasRoles = auth.getAdminRoles && auth.getAdminRoles.length > num0
            const hasMenuAsync = menu.getMenuAsync && menu.getMenuAsync.length > num0
            // console.log(auth.getAdminRoles)
            // console.log(menu.getMenuAsync)
            if (hasRoles && hasMenuAsync) {
                // console.log(router)
                next()
            } else {

                token = localStorage.getItem('admin-token')
                const result = await auth[ADMIN_INFO_RESULT](token).catch(err => {
                    next('/login')
                    return false
                })
                const {roles} = result.data
                const accessRouters = await menu[MENUS_GENERATE](roles)
                if (accessRouters.length > num0) {
                    accessRouters.forEach(item => {
                        router.addRoute(item)
                    })
                    // console.log(router)
                    next({
                        ...to,
                        replace: true
                    })
                }
            }
        }
    } else if (!token && whiteList.indexOf(to.path) !== numN1) {
        next()
    } else {
        next('/login')
    }

})