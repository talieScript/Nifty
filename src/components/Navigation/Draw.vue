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
            <md-list-item>
                <md-icon>move_to_inbox</md-icon>
                <span class="md-list-item-text">Inbox</span>
            </md-list-item>

            <md-list-item>
                <md-icon>send</md-icon>
                <span class="md-list-item-text">Sent Mail</span>
            </md-list-item>

            <md-list-item>
                <md-icon>delete</md-icon>
                <span class="md-list-item-text">Trash</span>
            </md-list-item>

            <md-list-item>
                <md-icon>error</md-icon>
                <span class="md-list-item-text">Spam</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Draw',

    })
</script>

<style scoped>
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
</style>