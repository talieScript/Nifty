import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '../API.ts'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeCollection: 'Seaside',
    activePicture: {},
    collections: []
  },
  mutations: {
    setActiveCollection (state, collection) {
      state.activeCollection = collection
    },
    setActivePicture (state, picture) {
      state.activePicture = picture
    },
    setCollections(state, collections) {
      state.collections = collections
    }
  },
  actions: {
    async getCollections(context) {
      if(!context.state.collections.length) {
        const collections = await API.get('/collections/names');
        context.commit('setCollections', collections);
      }
      return;
    }
  }
})

export default store