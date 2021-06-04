<template>
    <div class="lay-logo-row">
        <img class="lay-logo" src="../../assets/logo.png"/>
        <div v-show="!collapsed" class="lay-logo-text">logo</div>
    </div>
</template>

<script setup>
    import {defineProps} from 'vue'

    defineProps({
        collapsed: Boolean
    })
</script>

<style scoped>
    .lay-logo-row {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        padding-left: 24px;
        color: #fff;
        font-size: 20px;
    }

    .lay-logo {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
</style>