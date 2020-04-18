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
            :windowWidth="windowWidth"
          />

          <!-- Collections tabs -->
          <transition name="fade">
            <collections class="collections-tab" v-if="collectionTabs && windowWidth > 1000" />
          </transition>

        </md-app-toolbar>
        <!-- Phone navigation  -->
          <md-app-drawer v-if="windowWidth < 1000" class="drawer-menu" :md-active.sync="drawVisible">
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
      loading: true,
      windowWidth: window.innerWidth,
      debouncedGetWindowWidth: this.debounce(() => {
        this.windowWidth = window.innerWidth
        console.log(this.windowWidth)
      }, 200, false)
    }
  },
  components: {
    MainNav,
    Collections,
    Draw,
    Spinner,
  },
  computed: {
    name() {
      return this.data
    }
  },
  methods: {
    changeCollectionsTabs(value) {
      this.collectionTabs = value;
    },
    debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
  },
  mounted() {
     window.addEventListener('resize', () => {
       this.debouncedGetWindowWidth()
    })
    setTimeout(() => {
      this.loading = false;
    }, 1000)
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

  .drawer-menu {
    @media (min-width: 1000px) {
      display: none;
    }
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

// break point classes
@mixin respond($breakpoint) {
  @if $breakpoint == phone {
    @media only screen and (max-width: 37.5em) { @content }; // 600px max-width
  }
  @if $breakpoint == tab-port {
    @media only screen and (max-width: 56.25em) { @content }; // 900px max-width
  }
  @if $breakpoint == tab-lan {
    @media only screen and (max-width: 75em) { @content }; // 1200xp max-width
  }
  @if $breakpoint == big-desk {
    @media only screen and (min-width: 119em) { @content }; // 1800px min-width
  }
}

.main-tabs {
  @include respond(tab-port) {
    display: none;
  }
}

</style>
