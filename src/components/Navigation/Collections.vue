<template>
    <md-tabs md-sync-route class="md-primary" @click.native="changed">
        <md-tab id="tab-home" md-label="Home" to="/" exact />
        <md-tab id="tab-pages" md-label="Pages"></md-tab>
        <md-tab id="tab-posts" md-label="Posts"></md-tab>
        <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
    </md-tabs>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({

    })
</script>

<style scoped>

</style>