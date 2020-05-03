<template>
  <div id="app">
    <picture-modal
        :picture="activePicture"
        :collections="collections"
        :show="pictureModal"
        @toPicturePage="toPicturePage"
        @close="pictureModal = false"
    />
    <transition name="fade">
      <spinner v-if="loading" />
      <md-app v-else md-waterfall :md-mode="'fixed-last'">
        <!-- Main -->
        <md-app-toolbar class="md-large md-dense md-primary">
          <main-nav
            @showCollections="showCollectionTabs"
            @drawVisible="drawVisible = !drawVisible"
            :activeCollection="activeCollection.Title"
            class="main-tab"
            :windowWidth="windowWidth"
          />

          <!-- Collections tabs -->
          <transition name="fade">
            <collections
              @activeCollectionChange="activeCollectionChange"
              :collections="collectionTitles"
              :activeCollection="activeCollection.Title"
              class="collections-tab"
              v-if="collectionTabs && windowWidth > 1000"
            />
          </transition>

        </md-app-toolbar>
        <!-- Phone navigation  -->
          <md-app-drawer  v-if="windowWidth < 1000" class="drawer-menu" :md-active.sync="drawVisible">
            <draw
              :collections="collectionTitles"
              :activeCollection="activeCollection.Title"
              @activeCollectionChange="activeCollectionChange"
              @close='drawVisible = false'
            />
          </md-app-drawer>
        <!-- Page Content -->
        <md-app-content>
          <transition name="fade-delay">
            <router-view
              @showCollectionTabs='showCollectionTabs'
              @activeCollectionChange="activeCollectionChange"
              @activePictureChange="changeActivePicture"
              @openModal="openModal"
              :collections="collections"
              :collection="activeCollection"
              :windowWidth="windowWidth"
              :activePicture="activePicture"
              class="router-view"
            >
            </router-view>
          </transition>
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
import { API } from './API.ts'
import { toKebabCase } from './utils.js'
import PictureModal from './components/PictureModal.vue';


export default {
  name: 'App',
  metaInfo() {
      return {
          title: 'Nifty Gallery',
          htmlAttrs: {
              lang: 'en',
          },
          meta: [
              { name: 'author', content: 'Taliesin Bowes De Angeli' },
          ]
      }
  },
  data() {
    return {
      collections: [],
      collectionTabs: false,
      activeCollection: {},
      activePicture: {},
      pictureModal: false,
      drawVisible: false,
      loading: true,
      windowWidth: window.innerWidth,
      debouncedGetWindowWidth: this.debounce(() => {
        this.windowWidth = window.innerWidth
      }, 200, false)
    }
  },
  components: {
    MainNav,
    Collections,
    Draw,
    Spinner,
    PictureModal
  },
  computed: {
    name() {
      return this.data
    },
    collectionTitles() {
      return this.collections.map(collection => collection.Title)
    }
  },
  methods: {
    openModal(picture) {
      this.changeActivePicture(picture)
      this.pictureModal = true;
    },
    changeActivePicture(picture) {
      this.activeCollection = this.collections.find(collection => collection.id == picture.collection);
      this.activePicture = picture;
    },
    toPicturePage() {
      const path =
        `/collections/${toKebabCase(this.activeCollection.Title)}/${toKebabCase(this.activePicture.Title)}`;
      this.$router.push({ path });
    },
    activeCollectionChange(collectionTitle) {
      this.activeCollection = this.collections.find(
        collection => toKebabCase(collection.Title) === collectionTitle
      );
      if(!this.$router.currentRoute.path.includes(collectionTitle)) {
        this.$router.push({
          name: 'collections',
          params: { name: collectionTitle },
          props: { activeCollection: this.activeCollection }})
      }
      this.collectionTabs = true;
    },
    showCollectionTabs(value) {
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
    getCollections() {
      this.loading = true;
      API.get('/collections')
      .then(res => {
        this.collections = res.data;
        if(window.location.href.includes('/collections')) {
          const splitStr = window.location.href.split('/');
          let collectionTitle = '';
          if (splitStr.length === 5) {
            collectionTitle = splitStr[splitStr.length - 1];
          } else if (splitStr.length < 7) {
            collectionTitle = splitStr[splitStr.length - 2];
          } else {
            this.activeCollection = this.collections[0];
            this.$router.push('/')
            this.loading = false;
            return;
          }
          this.activeCollection = this.collections.find(collection => {
            return collectionTitle === toKebabCase(collection.Title.toLowerCase());
          });
          this.collectionTabs = true;
        } else {
          this.activeCollection = this.collections[0]
        }
        if(!this.activeCollection) {
          this.activeCollection = this.collections[0];
          this.$router.push('/')
        }
        this.loading = false;
      })
    },
  },
  created() {
    this.getCollections();
     window.addEventListener('resize', () => {
       this.debouncedGetWindowWidth()
    })
  },
}
</script>

<style lang="scss" scoped>
  $tertiary: #F0F3F4;

  .md-app {
    height: 100%;
    font-family: 'Raleway', serif;
  }

  .md-content {
    background-color: $tertiary !important;
    padding: 0;
    padding-bottom: 75px;
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

@import url('https://fonts.googleapis.com/css2?family=Crete+Round&family=Raleway&display=swap');

@include md-register-theme("default", (
  primary: #2C3D50, // The primary color of your application
  accent: #2F89A0 // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

$tertiary: #F0F3F4;
$text: rgb(145, 145, 145);

.fade-delay-enter-active, .fade-delay-leave-active {
  transition: opacity .3s;
}
.fade-delay-enter-active {
  transition-delay: .5s
}
.fade-delay-enter, .fade-delay-leave-to {
  opacity: 0;
}

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
  padding: 0 10px;
  box-shadow: 0px 6px 20px -5px rgba(0,0,0,0.33);
}

.md-toolbar {
    min-height: 0 !important;
    padding: 0 !important;
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
