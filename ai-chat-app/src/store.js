import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
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
    addMessage(state, message) {
      state.chatHistory.push(message);
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post('/login', { username, password });
        commit('setUsername', username);
        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async register({ commit }, { username, password }) {
      try {
        const response = await axios.post('/register', { username, password });
        return response;
      } catch (error) {
        console.error('Register error:', error);
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        const response = await axios.get('/logout');
        commit('setUsername', null);
        commit('setChatHistory', []);
        return response;
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },
    async sendMessage({ state, commit }, message) {
      try {
        const response = await axios.post('/ask', { question: message });
        const reader = response.data.getReader();
        let aiResponse = '';

        function readStream() {
          reader.read().then(({ done, value }) => {
            if (done) {
              commit('addMessage', { sender: 'ai', content: aiResponse });
              return;
            }
            const chunk = new TextDecoder().decode(value);
            aiResponse += chunk;
            commit('addMessage', { sender: 'ai', content: aiResponse, isStreaming: true });
            readStream();
          });
        }
        readStream();
      } catch (error) {
        console.error('Send message error:', error);
        throw error;
      }
    },
    async uploadFiles({ commit }, files) {
      try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
        const response = await axios.post('/upload', formData);
        return response;
      } catch (error) {
        console.error('Upload files error:', error);
        throw error;
      }
    },
    async loadChatHistory({ commit }) {
      try {
        const response = await axios.get('/get_chat_history');
        commit('setChatHistory', response.data.chat_history);
        return response;
      } catch (error) {
        console.error('Load chat history error:', error);
        throw error;
      }
    },
  },
});