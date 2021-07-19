<template>
    <div class="tiny-editor">
        <editor v-model="tinyContent"
                :api-key="tinyKey"
                :init=initTmp
                id="editor"/>
    </div>
</template>

<script setup>
    import {defineEmit, ref, watch} from 'vue'
    import Editor from '@tinymce/tinymce-vue'


    const pluginsTmpStrAll = [
        'print preview paste importcss searchreplace autolink autosave save ',
        'directionality code visualblocks visualchars fullscreen image link media ',
        'template codesample table charmap',
        ' hr pagebreak nonbreaking anchor toc insertdatetime advlist ',
        'lists wordcount imagetools textpattern noneditable',
        ' help charmap quickbars emoticons'
    ]

    const tabBarTmpStrAll = 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect ' +
        'formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | ' +
        'forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print |' +
        ' insertfile image media template link anchor codesample | ltr rtl'

    const pluginsTmpStr = [
        'preview print paste advlist autolink lists link image charmap preview anchor',
        'searchreplace visualblocks code fullscreen',
        'autosave save',
        'insertdatetime media table paste code help wordcount'
    ]
    const tabBarTmpStr = 'undo redo | formatselect | bold italic underline |  ' +
        'alignleft aligncenter alignright alignjustify | forecolor backcolor' +
        '| bullist numlist | lists image media table | removeformat | help '


    const menubar = 'file edit view insert format tools table help'

    const contentStr = ''

    const tinyContent = ref(contentStr)
    import {tiny} from '@/config/tiny'

    const tinyKey = tiny.key

    let initTmp = {
        'language_url': '/tiny/langs/zh_CN.js',
        language: 'zh_CN',
        height: 500,
        menubar,
        plugins: pluginsTmpStr,
        toolbar: tabBarTmpStr,
        // a11y_advanced_options: true,
        selector: '#editor',
        'image_title': true,
        'file_picker_types': 'image',
        'image_description': false,
        // 'images_upload_url': tiny.uploadPath,
        'images_file_types': 'jpg,png,jpeg',
        'images_upload_credentials': true,
        'imagetools_cors_hosts': tiny.tinyCors,
        'images_upload_handler': editorImageUploadHandler,
        // content_style: 'body { font-family:Helvetica,Arial,sans-serif;}'
    }

    const emit = defineEmit(['context-change'])
    watch(() => tinyContent.value, (val, old) => {
        emit('context-change', val)
    })


    const beforeUpload = file => {
        // const isJPG = file.type === 'image/jpeg'
        // if (!isJPG) {
        //     this.$message.error('You can only upload JPG file!')
        // }
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isLt2M) {
        //     this.$message.error('Image must smaller than 2MB!')
        // }
        // return isJPG && isLt2M
    }

    function editorImageUploadHandler(blobInfo, success, failure) {
        let xhr = new XMLHttpRequest()
        let num100 = 100
        let num403 = 403
        let num200 = 200
        let num300 = 300
        xhr.withCredentials = false
        xhr.open('POST', tiny.uploadPath)
        // xhr.upload.onprogress = eve => {
        //     progress(eve.loaded / eve.total * num100)
        // }
        // eslint-disable-next-line func-names
        xhr.onload = function () {
            let json = {}
            if (xhr.status === num403) {
                failure(`HTTP Error: ${xhr.status}`, {remove: true})
                return
            }
            if (xhr.status < num200 || xhr.status >= num300) {
                failure(`HTTP Error: ${xhr.status}`)
                return
            }
            json = JSON.parse(xhr.responseText)
            if (!json || typeof json.data.img !== 'string') {
                failure(`Invalid JSON: ${xhr.responseText}`)
                return
            }
            success(json.data.img)
        }

        xhr.onerror = () => {
            failure(`Image upload failed due to a XHR Transport error. Code: ${xhr.status}`)
        }

        let formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())
        xhr.send(formData)

    }


</script>

<style scoped>

</style>