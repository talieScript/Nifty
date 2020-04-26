<template>
    <div
        v-if="show"
        class="loader"
    >
        &nbsp;
    </div>
</template>

<script>
    export default {
        name: 'ImageSkeletonLoader',
        props: {
            show: {
                type: Boolean,
                required: true,
            },
        }
    }
</script>

<style lang="scss" scoped>
    .loader {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.20);
        background-color: rgb(221, 219, 221);
        position: relative;
        overflow: hidden;
        width: 100%;
        border-radius: 5px;
         &::after {
           position: absolute;
           top: 0;
           right: 0;
           bottom: 0;
           left: 0;
           transform: translateX(-100%);
           background-image: linear-gradient(
             90deg,
             rgba(#fff, 0) 0,
             rgba(#fff, 0.4) 20%,
             rgba(#fff, 0.7) 60%,
             rgba(#fff, 0)
           );
           animation: shimmer 3s infinite;
           content: '';
         }
         @keyframes shimmer {
           100% {
             transform: translateX(100%);
           }
         }
    }
</style>