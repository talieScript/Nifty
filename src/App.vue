<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <img class="logo" src="./assets/nifty-logo.svg" alt="nifty logo">
            <span class="md-headline">Nifty</span>
            <md-tabs class="md-primary">
              <md-tab id="tab-home" md-label="Home" to="/" exact />
              <md-tab id="tab-artist" md-label="Artist" to="/artist" />
              <md-tab id="tab-collections" md-label="Collections" to="/collections">
                <md-list class="md-primary">
                  <md-list-item id="tab-collections-1" md-label="collections 1" to="/collection/1">collection 1</md-list-item>
                  <md-list-item id="tab-collections-2" md-label="collections 2" to="/collections/2">collection 2</md-list-item>
                </md-list>
              </md-tab>
            </md-tabs>
          </div>
          <div class="md-toolbar-section-end">
            <md-tabs class="md-primary">
              <md-tab id="tab-contact" md-label="Contact" to="/contact" exact/>
            </md-tabs>
          </div>
          </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">

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

.logo {
  height: 35px !important;
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
