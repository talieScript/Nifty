<template>
    <div>
        <div class="header">
            <img class="logo" src="../../assets/nifty-logo.svg" alt="nifty logo" />
            <span class="md-headline">Nifty Gallery</span>
            <md-button class="close-icon md-icon-button" @click="$emit('close')">
                <md-icon>close</md-icon>
            </md-button>
        </div>
        <md-list>
            <md-list-item @click="$emit('close')">
                <router-link to='/' class="link">
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">Home</span>
                </router-link>
            </md-list-item>
            <md-list-item @click="$emit('close')">
                <router-link @click="$emit('close')" to='/artist' class="link">
                    <icon fill="#808080" iconStyle="width:24px;height:24px" viewBox="0 0 25 25" path="M22.84,4.89A13.17,13.17,0,0,0,12.53,0a12.5,12.5,0,0,0,0,25c5,0,7.26-2,7.77-4A2.81,2.81,0,0,0,19,17.8c-2.11-1.19-2.5-2.75-2-3.76s1.91-1.45,3.56-.58a2.76,2.76,0,0,0,3.45-.78C25.3,11.25,25.6,8.45,22.84,4.89ZM6.5,16.5a2,2,0,1,1,2-2A2,2,0,0,1,6.5,16.5Zm0-9a2,2,0,1,1,2,2A2,2,0,0,1,6.5,7.5Zm5,14a2,2,0,1,1,2-2A2,2,0,0,1,11.5,21.5Zm4-13a2,2,0,1,1,2-2A2,2,0,0,1,15.5,8.5Z"/>
                    <span class="md-list-item-text">Artist</span>
                </router-link>
            </md-list-item>
            <md-list-item md-expand :md-expanded.sync="expandCollections">
                <router-link to='/collections' class="link">
                    <md-icon>collections</md-icon>
                    <span class="md-list-item-text">Collections</span>
                </router-link>
                <md-list @click="$emit('close')" slot="md-expand">
                    <md-list-item class="md-inset">World</md-list-item>
                    <md-list-item class="md-inset">Europe</md-list-item>
                    <md-list-item class="md-inset">South America</md-list-item>
                </md-list>
            </md-list-item>
            <md-list-item>
                <router-link @click="$emit('close')" to='/contact' class="link">
                    <md-icon>info</md-icon>
                    <span class="md-list-item-text">Contact</span>
                </router-link>
            </md-list-item>
        </md-list>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Icon from '../Icon.vue'

    export default Vue.extend({
        name: 'Draw',
        components: {
            Icon,
        },
        data() {
            return {
                expandCollections: false,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        padding: 6px 10px;
    }
    .logo {
        height: 40px;
        margin-right: 5px;
    }
    .close-icon {
        margin: 0;
        margin-left: auto;
    }
    .md-list-item:hover {
            background-color: var(--md-theme-default-divider-on-background, rgba(0, 0, 0, 0.12));
        }
    .link {
        display: flex;
        align-items: center;
        text-decoration: none !important;
        height: 40px;
        width: 100%;
        .md-list-item-text {
            margin-left: 30px;
        }
    }
</style>