<template>
    <div class="md-toolbar-row">
      <div class="md-layout md-toolbar-section-start">
        <md-button class="md-icon-button drawer-menu-btn" @click="$emit('drawVisible')">
          <md-icon>menu</md-icon>
        </md-button>
        <div class="nifty-title">
          <img class="logo" src="../../assets/nifty-logo.svg" alt="nifty logo" />
          <span class="md-headline">Nifty</span>
        </div>
        <md-tabs v-if="windowWidth > 1000" md-sync-route class="md-primary md-layout-item main-tabs" @click.native="changed">
          <md-tab id="tab-home" md-label="Home" to="/" exact />
          <md-tab id="tab-artist" md-label="Artist" to="/artist" exact />
          <md-tab id="tab-collections" md-label="Collections" to="/collections" />
        </md-tabs>
      </div>
      <div v-if="windowWidth > 1000" class="md-toolbar-section-end">
        <md-tabs md-sync-route class="md-primary main-tabs" @click.native="changed">
          <md-tab id="tab-contact" md-label="Contact" to="/contact" />
        </md-tabs>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: 'MainNav',
    props: {
      windowWidth: {
        type: Number,
        requied: true,
      },
    },
    watch: {
      windowWidth(val) {
        console.log(val > 1000);
      }
    },
    methods: {
        changed() {
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

.md-headline {
  margin-left: 10px;
}

#tab-collections {
  position: absolute;
}

.nifty-title {
    margin: 5px 0;
    display: flex;
    align-items: center;
}

.logo {
  height: 35px !important;
}
.main-tabs {
  @media (max-width: 1000px) {
    display: none;
  }
 }

 .drawer-menu-btn {
  @media (min-width: 1000px) {
    display: none;
  }
 }
</style>