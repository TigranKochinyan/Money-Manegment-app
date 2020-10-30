import firebase from 'firebase/app';

export default {
	actions: {
		async createRecord({ dispatch,commit }, record) {
			try {
				const uid = await dispatch('getUserid');
				return await firebase.database().ref(`users/${uid}/records`).push(record);
			} catch (error) {
				commit('setError', error);
				throw error;
			}
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserid');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
        return Object.keys(records).map(key => ({ ...records[key], id: key }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUserid');
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};
        console.log('tochni a record@');
        return {...record, id};
      } catch (error) {
        console.log('error a record@');
        commit('setError', error);
        // throw error;
      }
    }
	}
}