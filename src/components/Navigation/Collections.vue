<template>
    <md-tabs :md-active-tab="active" class="collection-tabs md-primary" @md-changed='active = $event'>
        <template v-for="collection in collections">
            <md-tab
                v-bind:key="collection"
                :id="`${toKebabCase(collection)}`"
                :md-label="collection"
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
            activeCollection: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                toKebabCase,
            }
        },
        computed: {
            active: {
                get() {
                    return this.activeCollection;
                },
                set(collection) {
                    console.log(collection);
                    this.$emit('activeCollectionChange', collection)
                }
            }
        },
    })
</script>

<style scoped>
    .collection-tabs {
        width: 100%;
        overflow-x: auto;
    }

    ::v-deep .md-tabs-navigation {
        width: 100%;
        min-width: 1200px;
    }
</style>