import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '../API.ts'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeCollection: '',
    activePicture: {},
    collections: [],
    showCollectionTabs: true,
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
        const collectionsRes = await API.get('/collections/names');
        context.commit('setCollections', collectionsRes.data);
        context.commit('setActiveCollection', collectionsRes.data[0].id);
      }
      return;
    }
  }
})

export default store