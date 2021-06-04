import {login, getInfo} from '@/api/admin'
import {defineStore} from 'pinia'
import {
    ADMIN_LOGIN_RESULT, ADMIN_INFO_RESULT,
    ADMIN_LOGOUT
} from '@/store/actions-types'
import router, {asyncRoutes} from '@/router'

import {httpCodeSuccess} from '@/utils/code'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        adminToken: '',
        adminInfo: '',
        adminRoles: []
    }),
    getters: {
        getAdminToken: state => state.adminToken,
        getAdminInfo: state => state.adminInfo,
        getAdminRoles: state => state.adminRoles
    },
    actions: {
        // 登陆保存token到store
        [ADMIN_LOGIN_RESULT](form) {
            return new Promise((resolve, reject) => {
                login(form).then(response => {
                    const {code, token, data} = response
                    if (code === httpCodeSuccess) {
                        const tokenStr = token || ''
                        localStorage.setItem('admin-token', tokenStr)
                        const info = JSON.stringify(data)
                        localStorage.setItem('admin-info', info)
                        this.adminToken = token
                        this.adminInfo = data
                        // this.state.$patch({
                        //     adminToken: token,
                        //     adminInfo: info,
                        // })
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        [ADMIN_INFO_RESULT](token) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const {code, data} = response
                    if (code === httpCodeSuccess) {
                        const infoStr = JSON.stringify(data)
                        this.adminInfo = data
                        this.adminRoles = data.roles
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        [ADMIN_LOGOUT]() {
            localStorage.removeItem('admin-token')
            localStorage.removeItem('admin-info')
            this.adminToken = ''
            this.adminInfo = ''

            asyncRoutes.forEach(item => {
                router.removeRoute(item.name)
            })
        }
    }
})