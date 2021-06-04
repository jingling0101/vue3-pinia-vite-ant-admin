<template>
    <div>
        <router-view />
    </div>
</template>

<script setup>

    import {useRouter} from 'vue-router'
    import {defineProps} from 'vue'

    let router = useRouter()
    const props = defineProps({
        path: String
    })
    router.push(props.path)


</script>

<style scoped>

</style>