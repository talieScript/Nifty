<template>
    <div>
        <img
            class="image"
            :src="getPicUrl(url)"
            :alt="title"
        >
        <p class="caption">
            {{ title }}
        </p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { getPicUrl } from '../utils.ts';

    export default Vue.extend({
        name: 'CollectionImage',
        props: {
            url: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                getPicUrl
            }
        }
    })
</script>

<style scoped>
    .image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);        border-radius: 5px;
        width: 100%;
    }
    .caption {
        text-align: center;
        width: 80%;
        margin: 0 auto;
        border-bottom: 2px #ADADAD solid;
        padding: 15px  25px;
    }
</style>