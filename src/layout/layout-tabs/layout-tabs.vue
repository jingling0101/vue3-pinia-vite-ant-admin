<template>

        <a-tabs v-model:activeKey="activeKey" @change="changePane" @edit="removePane"
                type="editable-card" hide-add size="small" tabPosition="top">
            <a-tab-pane v-for="pane in panes" :key="pane.fullPath" :tab="pane.meta.title" :tabBarStyle="tabStyle"
                        :closable="panes.length > 1" size="large"></a-tab-pane>
        </a-tabs>

</template>

<script setup>
    import {ref, watch} from 'vue'
    import {useRoute, useRouter} from 'vue-router'

    const route = useRoute()
    const router = useRouter()

    const paneInit = {
        fullPath: route.fullPath,
        meta: route.meta,
        path: route.path
    }

    const num0 = 0
    const num1 = 1


    let panes = ref([paneInit])
    const activeKey = ref(panes.value[num0].fullPath)

    watch(() => route.fullPath, (to, from) => {
        if (!panes.value.find(item => item.fullPath === to)) {
            const paneNew = {
                fullPath: route.fullPath,
                meta: route.meta,
                path: route.path
            }
            panes.value.push(paneNew)
            activeKey.value = paneNew.path
            return
        }
        activeKey.value = route.path

    })

    const changePane = path => {
        activeKey.value = path
        router.push(path)
    }

    const removePane = path => {
        if (panes.value.length <= num1) {
            return
        }
        const routerPath = panes.value.find(item => path === item.path)
        panes.value.forEach((item, index) => {
            if (item.fullPath === routerPath.fullPath) {
                if (index > num0) {
                    const pathNew = panes.value[index - num1].path
                    panes.value.splice(index, num1)
                    activeKey.value = pathNew
                    router.push(pathNew)
                } else {
                    const pathNew = panes.value[index + num1].path
                    panes.value.splice(index, num1)
                    activeKey.value = pathNew
                    router.push(pathNew)
                }
            }
        })
    }

    const tabStyle = ref({
        'user-select': 'none'
    })

</script>

<style scoped>

</style>