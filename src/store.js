import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: null,
    chatHistory: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setChatHistory(state, history) {
      state.chatHistory = history;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return axios.post('/login', { username, password }).then(response => {
        commit('setUsername', username);
        return response;
      });
    },
    register({ commit }, { username, password }) {
      return axios.post('/register', { username, password }).then(response => {
        return response;
      });
    },
    logout({ commit }) {
      return axios.get('/logout').then(response => {
        commit('setUsername', null);
        commit('setChatHistory', []);
        return response;
      });
    },
    sendMessage({ state }, message) {
      return axios.post('/ask', { question: message }).then(response => {
        const reader = response.data.getReader();
        let aiResponse = '';
        function readStream() {
          reader.read().then(({ done, value }) => {
            if (done) {
              state.chatHistory.push({ sender: 'ai', content: aiResponse });
              return;
            }
            const chunk = new TextDecoder().decode(value);
            aiResponse += chunk;
            state.chatHistory.push({ sender: 'ai', content: aiResponse, isStreaming: true });
            readStream();
          });
        }
        readStream();
      });
    },
    uploadFiles({ commit }, files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      return axios.post('/upload', formData).then(response => {
        return response;
      });
    },
    loadChatHistory({ commit }) {
      return axios.get('/get_chat_history').then(response => {
        commit('setChatHistory', response.data.chat_history);
        return response;
      });
    },
  },
});