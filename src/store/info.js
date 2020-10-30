import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    set_info(state, info) {
      state.info = info;
    },
    clear_info(state) {
      state.info = {};
    }
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUserid');
        const updateData = {...getters.info, ...toUpdate};
        // console.log(uid,'---',updateData);//
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('set_info', updateData);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetch_info({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('set_info', info);
      } catch (error) {
        commit('setError', error);
        throw error;
      } 
    },
  },
  getters: {
    info: s => s.info,
  },

}