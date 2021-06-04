import {asyncRoutes, constantRoutes} from '@/router'
import {defineStore} from 'pinia'
import {
    MENUS_GENERATE
} from '@/store/actions-types'


export const useAsyncRouterStore = defineStore({
    id: 'sync-router',
    state: () => ({
        menusAsync: []
    }),
    getters: {
        getMenuAsync: state => state.menusAsync,
    },
    actions: {
        // --
        [MENUS_GENERATE](roles) {
            return new Promise(resolve => {
                let accessedRoutes = []
                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                this.menusAsync = constantRoutes.concat(accessedRoutes)
                resolve(accessedRoutes)
            })
        },
    }
})


const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    }
    return true
}

export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}