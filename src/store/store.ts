import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeCollection: 'Seaside',
    activePicture: {},
    colections: [
      'Abstract  Seascapes',
        'Collages',
        'Countryside',
        'Cows & Sheep',
        'Flora & Fauna',
        'Seaside',
        'Tasty Food'
    ]
  },
  mutations: {
    setActiveCollection (state, collection) {
      state.activeCollection = collection
    },
    setActivePicture (state, picture) {
      state.activePicture = picture
    },
  },
  actions: {
    // put get a collection request here
  }
})

export default store