<template>
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="$emit('drawVisible')">
          <md-icon>menu</md-icon>
        </md-button>
        <img class="logo" src="../../assets/nifty-logo.svg" alt="nifty logo" />
        <span class="md-headline">Nifty</span>
        <md-tabs md-sync-route class="md-primary" @click.native="changed">
          <md-tab id="tab-home" md-label="Home" to="/" exact />
          <md-tab id="tab-artist" md-label="Artist" to="/artist" exact />
          <md-tab id="tab-collections" md-label="Collections" to="/collections" />
        </md-tabs>
      </div>
      <div class="md-toolbar-section-end">
        <md-tabs md-sync-route class="md-primary" @click.native="changed">
          <md-tab id="tab-contact" md-label="Contact" to="/contact" />
        </md-tabs>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: 'MainNav',
    methods: {
        changed() {
          console.log('here')
            if (this.$router.currentRoute.path === '/collections') {
                this.$emit('showCollections', true);
            } else {
                this.$emit('showCollections', false)
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.md-toolbar-row, .md-toolbar, .md-tabs-navigation {
  min-height: 0 !important;
  // background-color: #2C3D50 !important;
}

#tab-collections {
  position: absolute;
}

.logo {
  height: 35px !important;
}
</style>