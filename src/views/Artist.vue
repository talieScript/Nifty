<template>
    <div>

    </div>
</template>

<script>
    import Vue from 'vue'
        import { API } from '../API.ts'


    export default Vue.extend({
        name: 'Artist',
        data() {
            return {
                header: '',
                content: '',
                mugShotUrl: ''
            }
        },
        created () {
            API.get('/artist-page')
                .then(res => {
                   this.content = res.data.Content;
                   this.header = res.data.Header;
                   this.mugShotUrl = res.data.Mug_Shot.url;
                })
        },
    })
</script>

<style scoped>

</style>