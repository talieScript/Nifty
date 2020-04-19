<template>
    <div class="collection">
        {{collection}}
    </div>
</template>

<script>
    export default {
        name: 'Collection',
        props: {
            collection: {
                type: Object,
                requied: true,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .collection {
        margin-top: 50px;
    }
</style>