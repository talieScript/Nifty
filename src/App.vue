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

<style>

.md-app {
  height: 100%;
  font-family: 'Volkhov', serif;
}

.md-toolbar-row, .md-toolbar, .md-tabs-navigation {
  min-height: 0 !important;
  background-color: #2C3D50 !important;
}
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
