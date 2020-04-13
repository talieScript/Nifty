<template>
  <div id="app">
    <transition name="fade">
      <spinner v-if="loading" />
      <md-app v-else md-waterfall md-mode="fixed-last">
        <!-- Main -->
        <md-app-toolbar class="md-large md-dense md-primary">
          <main-nav
            @showCollections="changeCollectionsTabs"
            @drawVisible="drawVisible = !drawVisible"
            class="main-tab"
          />

          <!-- Collections tabs -->
          <transition name="fade">
            <collections class="collections-tab" v-if="collectionTabs" />
          </transition>

        </md-app-toolbar>
        <!-- Phone navigation  -->
          <md-app-drawer :md-active.sync="drawVisible">
            <draw @close='drawVisible = false' />
          </md-app-drawer>


        <!-- Page Content -->
        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </transition>
  </div>
</template>

<script>
import MainNav from './components/Navigation/MainNav.vue';
import Collections from './components/Navigation/Collections.vue';
import Draw from './components/Navigation/Draw.vue';
import Spinner from './components/Spinner.vue'


export default {
  name: 'App',
  data() {
    return {
      drawVisible: false,
      collectionTabs: false,
      loading: true,
    }
  },
  components: {
    MainNav,
    Collections,
    Draw,
    Spinner,
  },
  methods: {
    changeCollectionsTabs(value) {
      this.collectionTabs = value;
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
  .md-app {
    height: 100%;
    font-family: 'Volkhov', serif;
  }

  #tab-collections {
    position: absolute;
  }
</style>


<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #2C3D50, // The primary color of your application
  accent: #2F89A0 // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

$tertiary: #F0F3F4;

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.collections-tab {
  z-index: 1;
}

.main-tab {
  z-index: 2;
}

.md-toolbar {
    min-height: 0 !important,
}

#app {
  height: 100vh;
  background-color: $tertiary;
}
</style>
