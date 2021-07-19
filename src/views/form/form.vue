<template>
    <div>
        <tiny @context-change="getEditorDesc"/>
        <div>
            <a-button @click="handleSubmit" class="submit-btn">提交</a-button>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import Tiny from '../../components/tiny/tiny.vue'

    const content = ref('')

    const getEditorDesc = text => {
        // console.log(`父组件原来content值${content.value}`)
        // console.log(`父组件接收content值${text}`)
        content.value = text
    }

    // 单击事件
    const handleSubmit = () => {
        console.log(content.value)
    }


</script>

<style scoped>

    .submit-btn{
        display: block;
        margin: 30px auto;
    }
</style>