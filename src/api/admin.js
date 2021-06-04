import request from '@/utils/request'

export const login = data => request({
    url: '/api/v-admin/user/login',
    method: 'post',
    data
})

export const getInfo = data => request({
    url: '/api/v-admin/user/info',
    method: 'post',
    data
})
