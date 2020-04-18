<template>
    <md-tabs md-sync-route class="md-primary" @click.native="changed">
        <template v-for="collection in collections">
            <md-tab
                v-bind:key="collection"
                :id="`tab-${collection}`"
                :md-label="collection"
                :to="`/collections/${collection}`"
                exact
            />
        </template>
    </md-tabs>
</template>

<script lang="ts">
    import Vue from 'vue'


    export default Vue.extend({
        name: 'Collections',
        props: {
            collections: {
                type: Array,
                required: true,
            },
        },
        mounted () {
            console.log(this.collections);
        },
    })
</script>

<style scoped>

</style>