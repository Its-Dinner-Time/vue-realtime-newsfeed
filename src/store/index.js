import { createStore } from 'vuex';
import sanity from '../client';

import { queries } from '../constants/env.js';

export default createStore({
  state: {
    menu_is_active: false,
    posts: [],
    authors: [],
    total_posts: 0,
    max_posts: 2,
    user: {},
  },
  getters: {
    posts: (state) => state.posts.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()),
    authors: (state) => state.authors,
  },
  // mutation => 동기 처리
  mutations: {
    TOGGLE_MENU: (state, isOpen) => {
      state.menu_is_active = isOpen;
    },
    SET_POSTS: (state, posts) => {
      state.posts = posts;
    },
    SET_AUTHORS: (state, authors) => {
      state.authors = authors;
    },
    SET_TOTAL_POSTS: (state, count) => {
      state.total_posts = count;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
  // actions => 비동기 처리
  actions: {
    ToggleMenu({ commit, state }) {
      commit('TOGGLE_MENU', !state.menu_is_active);
    },
    CloseMenu({ commit }) {
      commit('TOGGLE_MENU', false);
    },
    FetchPosts({ commit, state }) {
      const query = `${queries.getPost()} ${queries.with('author')} | ${queries.order('_createdAt', 'desc')} [0...${state.max_posts}]`;
      sanity.fetch(query).then((posts) => commit('SET_POSTS', posts));

      const countQuery = `count(${queries.getPost()})`;
      sanity.fetch(countQuery).then((count) => commit('SET_TOTAL_POSTS', count));
    },
    UpdatePost({ commit, state }, post) {
      const posts = state.posts.map((p) => (p._id === post._id ? post : p)); // 수정된 글의 _id가 같은 글만 수정된 내용 적용
      commit('SET_POSTS', posts);
    },
    AddNewPost({ commit, state }, post) {
      state.posts.pop(); // 제일 마지막 글 안보이게
      const posts = [...state.posts, post]; // 새 글 추가
      commit('SET_POSTS', posts);
      commit('SET_TOTAL_POSTS', state.total_posts + 1);
    },
    RemovePost({ dispatch, commit, state }, postId) {
      const posts = state.posts.filter((p) => p._id !== postId); // 글 삭제
      if (posts.length < state.posts.length) {
        dispatch('FetchPosts');
        return;
      }

      commit('SET_TOTAL_POSTS', state.total_posts - 1);
      commit('SET_POSTS', posts);
    },
    LoadMorePosts({ commit, state }, num) {
      const count = state.posts.length;
      const query = `${queries.getPost()} ${queries.with('author')} | ${queries.order('_createdAt', 'desc')} [${count}...${count + num}]`;
      sanity.fetch(query).then((posts) => commit('SET_POSTS', [...state.posts, ...posts]));
    },

    GetAuthors({ commit }) {
      const query = `${queries.getAuthor()} | ${queries.order('_createdAt', 'desc')}`;
      sanity.fetch(query).then((authors) => commit('SET_AUTHORS', authors));
    },

    LoginToken({ commit }, user) {
      // token 발행
      const accessToken = 'example_token';
      commit('SET_USER', { ...user, accessToken });
    },
  },
});
