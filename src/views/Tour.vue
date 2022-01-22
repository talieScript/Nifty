<template>
    <div class="tour">
      <iframe class="iframe" width="100%" height="100vh" name="virtual tour" src="https://3dplayer.online/show/18a6a"></iframe>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Artist',
        metaInfo: {
            titleTemplate: '%s | Virtual Tour',
        },
        data() {
            return {}
        },
    })
</script>

<style scoped>
  .tour {
    height: calc(100vh - 50px);
    margin-bottom: -100px
  }
  .iframe {
    height: 100%;
  }
</style>