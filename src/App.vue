<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <!-- Main -->
      <md-app-toolbar class="md-large md-dense md-primary">
        <main-nav
          @showCollections="changeCollectionsTabs"
          @drawVisible="drawVisible = !drawVisible"
        />

        <!-- Collections tabs -->
        <collections v-if="collectionTabs" />

      </md-app-toolbar>
       <!-- Phone navigation  -->
        <md-app-drawer :md-active.sync="drawVisible"></md-app-drawer>


      <!-- Page Content -->
      <md-app-content>
         <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import MainNav from './components/Navigation/MainNav.vue';
import Collections from './components/Navigation/Collections.vue';

export default {
  name: 'App',
  data() {
    return {
      drawVisible: false,
      collectionTabs: false,
    }
  },
  components: {
    MainNav,
    Collections,
  },
  methods: {
    changeCollectionsTabs(value) {
      this.collectionTabs = value;
    }
  },
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

#tab-collections {
  position: absolute;
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
