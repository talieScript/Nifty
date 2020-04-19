<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    // import Swiper from 'swiper';

    export default Vue.extend({
        name: 'Home',
        data() {
            return {
                swiper: null,
            }
        },
        mounted () {
            this.swiper = new window.Swiper('.swiper-container', {
                cssMode: true,
                // Navigation arrows
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
            });
        },
    })
</script>

<style scoped>
    .swiper-container {
        width: 600px;
        height: 300px;
    }
</style>