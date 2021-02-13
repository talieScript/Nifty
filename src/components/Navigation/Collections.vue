<template>
    <md-tabs :md-active-tab="active" class="collection-tabs md-primary" @md-changed='active = $event'>
        <template v-for="collection in collections">
            <md-tab
                v-bind:key="collection.id"
                :id="collection.id"
                :md-label="collection.Title"
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
        data() {
            return {
                toKebabCase,
            }
        },
        computed: {
            active: {
                get() {
                    return toKebabCase(this.$store.state.activeCollection);
                },
                set(collectionId) {
                    this.$store.commit('setActiveCollection', collectionId)
                }
            },
            collections() {
                return this.$store.state.collections;
            },
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
    }
</style>