<template>
    <div class="swiper-container">
        <transition name="fade">
            <div class="swiper-wrapper">
                <div v-if="loading" class="swiper-slide">
                    <spinner noText />
                </div>
                <!-- <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div> -->
            </div>
            <!-- Add Arrows -->
            <div v-if="!loading" class="swiper-button-next"></div>
            <div v-if="!loading" class="swiper-button-prev"></div>
        </transition>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Spinner from '../components/Spinner.vue'
    import { API } from './API.ts'

    export default Vue.extend({
        name: 'Home',
        components: {
            Spinner
        },
        data() {
            return {
                swiper: null,
                loading: true,
            }
        },
        created() {
            this.swiper = new window.Swiper('.swiper-container', {
                cssMode: true,
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
            });

        }
    })
</script>

<style lang="scss" scoped>
    .swiper-container {
        width: 100vw;
        height: 80vh;
    }
    .swiper-slide {
        background-color:  #F0F3F4;;

    }
    .swiper-button-next, .swiper-button-prev {
        color:  #F0F3F4;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>