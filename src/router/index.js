import {createRouter, createWebHistory} from 'vue-router'
import Layout from '../layout/layout.vue'

const Login = () => import('@/views/login/login.vue')
const Index = () => import('@/views/index/index.vue')

const Form = () => import('@/views/form/form.vue')
const Table1 = () => import("@/views/tables/table1.vue")
const Table2 = () => import("@/views/tables/table2.vue")

const Forbidden = () => import('@/views/error/403.vue')
const NotFound = () => import('@/views/error/404.vue')

export const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登陆',
            icon: '',
        },
        hidden: true,
        component: Login
    },
    {
        path: '/',
        name: 'index',
        component: Layout,
        redirect: '/',
        meta: {
            title: '首页',
            icon: 'icon-dashboard'
        },
        children: [
            {
                path: '/',
                name: 'index',
                component: Index,
                meta: {
                    title: '首页',
                    icon: 'icon-dashboard',
                }
            }
        ]
    },
    {
        path: "/table-dome",
        name: "table-dome",
        component: Layout,
        redirect: "",
        meta: {
            title: "table",
            icon: "icon-table"
        },
        children: [
            {
                path: "/table",
                name: "table",
                component: Table1,
                meta: {
                    title: "表格1",
                    icon: "icon-table",
                    affix: true
                }
            },
            {
                path: "/table2",
                name: "table2",
                component: Table2,
                meta: {
                    title: "表格2",
                    icon: "icon-table",
                    affix: true
                }
            }
        ]
    },

    {
        path: "/error",
        component: Layout,
        name: "error",
        redirect: "/403",
        meta: {
            title: "error",
            icon: "icon-error",
        },
        hidden: true,
        children: [
            {
                path: "/403",
                name: "forbidden",
                redirect: "",
                meta: {
                    title: "403",
                    icon: "icon-error",
                },
                hidden: true,
                component: Forbidden
            },
            {
                path: "/404",
                name: "not-found",
                redirect: "",
                meta: {
                    title: "404",
                    icon: "icon-error",
                },
                hidden: true,
                component: NotFound
            },
        ]
    },

]


export const asyncRoutes = [
    {
        path: '/form',
        name: 'form',
        component: Layout,
        redirect: '/form1',
        meta: {
            title: '表单',
            icon: 'icon-filedone'
        },
        children: [
            {
                path: '/form1',
                name: 'form1',
                component: Form,
                meta: {
                    title: '表单',
                    icon: 'icon-filedone',
                    affix: true
                }
            }
        ]
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        hidden: true,
        name: '404'
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

export const resetRouter = () => createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})


export default router