<template>
    <div>
        {{picture}}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Picture',
        props: {
            picture: {
                type: String,
                required: true,
            },
            collections: {
                type: Array,
                required: true,
            }
        },
        mounted() {
            console.log(this.picture)
            // this.$emit(
            //     'activeCollectionChange',
            //     this.collections.find(collection => collection.id == this.picture.collection).Title

            // )
        }
    })
</script>

<style scoped>

</style>