<template>
    <div>
        <a-menu
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="inline"
        >
            <template v-for="items in menus">
                <template v-if="!items.hidden && items.children && items.children.length > 1">
                    <a-sub-menu :key="items.name">
                        <template v-slot:title>
                            <my-icon v-model:type="items.meta.icon" :style="fontStyle"/>
                            <span>{{items.meta.title}}</span>
                        </template>

                        <a-menu-item v-for="item in items.children" :key="item.name" @click="clickMenuItem(item.name)">
                            <template v-if="!item.hidden">
                                <my-icon :type="item.meta.icon" :style="fontStyle"/>
                                <span>{{item.meta.title}}</span>
                            </template>
                        </a-menu-item>

                    </a-sub-menu>
                </template>

                <template v-if="!items.hidden && items.children.length < 2">
                    <a-menu-item :key="items.name" @click="clickMenuItem(items.name)">
                        <my-icon v-model:type="items.meta.icon" :style="fontStyle"/>
                        <span>{{items.meta.title}}</span>
                    </a-menu-item>
                </template>
            </template>
        </a-menu>
    </div>
</template>

<script setup>
    import {createFromIconfontCN} from '@ant-design/icons-vue'
    import {useContext, defineEmit, defineProps, ref, onMounted, watch, watchEffect} from 'vue'
    import {useRouter, useRoute} from 'vue-router'
    import {useAsyncRouterStore} from '@/store/store-menu'

    import {iconUrl} from '@/utils/icon'
    const MyIcon = createFromIconfontCN({
        scriptUrl: iconUrl
    })

    let router = useRouter()
    const route = useRoute()

    const fontStyle = ref({
        fontSize: '16px'
    })
    const menuAsync = useAsyncRouterStore()

    const menus = ref([])

    const selectedKeys = ref([''])
    onMounted(() => {
        menus.value = menuAsync.getMenuAsync
        selectedKeys.value = [route.name]
    })

    watch(() => menuAsync.getMenuAsync, (val, old) => {
        console.log(val)
        console.log(old)
        menus.value = menuAsync.getMenuAsync
    })

    // watchEffect(() => {
    //     menus.value = menuAsync.getMenuAsync
    // })


    // const props = defineProps({msg: String})

    const emit = defineEmit(['menu-click'])
    const clickMenuItem = name => {
        if (router.hasRoute(name)) {
            selectedKeys.value = [name]
            router.push({name})
            // console.log(`子组件Props.selectMenu值${name}`)
            emit('menu-click', name)
        } else {
            router.push({name: '403'})
        }
    }


</script>

<style scoped>

</style>