<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Nifty</span>
            <md-tabs class="md-primary">
              <md-tab id="tab-home" md-label="Home"></md-tab>
              <md-tab id="tab-pages" md-label="Pages"></md-tab>
              <md-tab id="tab-posts" md-label="Posts"></md-tab>
              <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
            </md-tabs>
          </div>
          <div class="md-toolbar-section-end">
            <md-tabs class="md-primary">
              <md-tab id="tab-home" md-label="Contact"></md-tab>
            </md-tabs>
          </div>
          </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>
      </md-app-drawer>

      <md-app-content>
         <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      menuVisible: false,
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #2C3D50, // The primary color of your application
  accent: #2F89A0 // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

.md-app {
  height: 100%;
  font-family: 'Volkhov', serif;
}

.md-toolbar-row, .md-toolbar, .md-tabs-navigation {
  min-height: 0 !important;
  // background-color: #2C3D50 !important;
}

/* .contact-btn {
  he
} */
#app {
  height: 100vh;
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
