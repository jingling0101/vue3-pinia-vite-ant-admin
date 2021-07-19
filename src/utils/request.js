import axios from 'axios'
import {message} from 'ant-design-vue'

import {httpCodeSuccess, timeOut, tokenIllegal, tokenLogged, tokenExpired} from '@/config/code'
import {hostUrl} from "@/config/url";

const service = axios.create({
    bas1eURL: hostUrl.baseURL,
    timeout: timeOut
})


//
service.interceptors.request.use(
    config => {
        if (localStorage.getItem('admin-token')) {
            // ['X-Token'] is a custom headers key
            config.headers['X-Token'] = localStorage.getItem('admin-token')
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error)
        return Promise.reject(error)
    }
)


//
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== httpCodeSuccess) {
            message.error(res.message || 'request api error')
            if (res.code === tokenIllegal || res.code === tokenLogged || res.code === tokenExpired) {
                // to re-login
                const msg = 'must login again'
                message.error(res.message || msg)
            }
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res

    },
    error => {
        console.log(`err${error}`)
        message.error(error.message || 'Error')
        return Promise.reject(error)
    }
)


export default service