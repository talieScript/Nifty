<template>
    <md-tabs md-sync-route class="md-primary">
        <template v-for="collection in collections">
            <md-tab
                v-bind:key="collection"
                :id="`tab-${collection}`"
                :md-label="collection"
                :to="`/collections/${toKebabCase(collection)}`"
                exact
            />
        </template>
    </md-tabs>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { toKebabCase } from '../../utils.js'


    export default Vue.extend({
        name: 'Collections',
        props: {
            collections: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                toKebabCase
            }
        },
        mounted () {
            console.log(toKebabCase);
        },
        methods: {
            changed(value) {
                console.log(value)
            }
        },
    })
</script>

<style scoped>

</style>