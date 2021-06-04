<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-row>
            <a-col>
                <menu-unfold-outlined
                        v-if="collapsed"
                        class="trigger"
                        @click="changeCollapse"
                />
                <menu-fold-outlined
                        v-else
                        class="trigger"
                        @click="changeCollapse"
                />
            </a-col>
            <a-col>
                <div class="app-avatar">
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            <a-avatar size="large">
                                <template #icon>
                                    <UserOutlined/>
                                </template>
                            </a-avatar>
                            {{user.username}}
                            <DownOutlined/>
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>个人中心</a-menu-item>
                                <a-menu-item @click="logout">退出</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-col>
        </a-row>

    </a-layout-header>

</template>

<script setup>
    import {useContext, createVNode, defineEmit, defineProps, ref, computed, watchEffect} from 'vue'
    import {useRouter} from 'vue-router'
    import {useAuthStore} from '@/store/store-auth'

    import {message, Modal} from 'ant-design-vue'
    import {
        DownOutlined,
        UserOutlined,
        ExclamationCircleOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    } from '@ant-design/icons-vue'

    const props = defineProps({
        collapsed: Boolean
    })


    // console.log(props.collapsed)
    const emit = defineEmit(['collapse-click'])
    // const ctx = useContext()
    const changeCollapse = () => {
        console.log(`子组件Props.collapsed值${props.collapsed}`)
        // ctx.emit("collapse-click", !props.collapsed)
        emit('collapse-click', !props.collapsed)
    }

    const router = useRouter()

    const auth = useAuthStore()

    const user = JSON.parse(localStorage.getItem('admin-info'))


    import {ADMIN_LOGOUT} from '@/store/actions-types'
    const logout = () => {
        Modal.confirm({
            title: '确定退出吗?',
            icon: createVNode(ExclamationCircleOutlined),
            content: createVNode('div', {style: 'color:green;'}, '确定退出'),
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log('OK')
                console.log(auth)
                auth[ADMIN_LOGOUT]()
                router.push('/login')
                message.info('退出成功')
            },
            onCancel() {
                console.log('Cancel')
            },
            class: 'test',
        })
    }

</script>

<style scoped>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }

    .ant-row {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
    }

</style>