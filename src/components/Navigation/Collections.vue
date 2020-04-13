<template>
    <md-app-toolbar class="md-large md-dense md-primary">
        <md-tabs md-sync-route class="md-primary" @click.native="changed">
            <md-tab id="tab-home" md-label="Home" to="/" exact />
        </md-tabs>
    </md-app-toolbar>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({

    })
</script>

<style scoped>

</style>