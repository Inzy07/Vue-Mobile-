import Vue from 'vue';
import { CancelToken } from 'axios';
import onsenjs from './onsenjs';
import { validFeeds, config } from '~/common/api';
import { lazy } from '~/common/utils';
// Learn more on https://nuxtjs.org/guide/vuex-store

// =================================================
// State
// =================================================
export const state = () => {
  const s = {
    items: {
      /*  [id: number]: Item */
    },
    feeds: {
      /* [filters: string] :[ [id: number] ] */
    },
    buildings: {
      /* [id: string]: User */
    },
    properties: {
      /* [id: string]: User */
    },
    location_id: '',
    listing_id: '',
    project_id: '',
    leadpretext: '',
    channel: 550,
    config: config,
  }

  validFeeds.forEach((feed) => {
    s.feeds[feed] = {}
    s.items[feed] = {}
  })

  return s
}


// =================================================
// Mutations
// =================================================
export const mutations = {
  SET_FEED: (state, { feed, ids, filters }) => {
    Vue.set(state.feeds[feed], filters, ids)
  },
  SET_LOCATIONID: (state, id) => {
    state.location_id = id
  },
  SET_LISTINGID: (state, id) => {
    state.listing_id = id
  },
  SET_CHANNELID: (state, id) => {
    state.channel = id
  },
  SET_PROJECTID: (state, id) => {
    state.project_id = id
  },
  SET_ITEMS: (state, { items, feed }) => {
    items.forEach((item) => {
      if (item) {
        Vue.set(state.items[feed], item.id, item)
      }
    })
  },
  SET_BUILDING: (state, { community, items }) => {
    Vue.set(state.buildings, community, items || false) /* false means user not found */
  },
  SET_PROPERTY: (state, { id, items }) => {
    Vue.set(state.properties, id, items || false) /* false means user not found */
  }
}
// =================================================
// Actions
// =================================================
export const actions = {
  FETCH_FEED({ commit, state }, { feed, filters, prefetch }) {
    // Don't priorotize already fetched feeds
    if (state.feeds[feed][filters] && state.feeds[feed][filters].length) {
      prefetch = true
    }
    if (!prefetch) {
      if (this.feedCancelSource) {
        this.feedCancelSource.cancel(
          'priorotize feed: ' + feed + ' page: ' + filters
        )
      }
      this.feedCancelSource = CancelToken.source()
    }
    return lazy(
      (data) => {
        let items
        if (data.items) {
          items = data.items
        } else {
          items = data
        }
        const ids = items.map(item => item.id)
        commit('SET_FEED', { feed, ids, filters })
        commit('SET_ITEMS', { items, feed })
      },
      () =>
        this.$axios.$get(`/property/website/${feed}${filters}`, {
          cancelToken: this.feedCancelSource && this.feedCancelSource.token
        }),
      (state.feeds[feed][filters] || []).map(id => state.items[feed][id])
    )
  },
  FETCH_BUILDING({ state, commit }, { community }) {
    return lazy(
      (building) => {
        let items
        if (building.items) {
          items = building.items[0]
        } else {
          items = building
        }
        commit('SET_BUILDING', { community, items })
      },
      () => this.$axios.$get(`/property/website/GetBuildingDetails/EN/${config.websiteId}/${community}`),
      Object.assign({ community, loading: true }, state.buildings[community])
    )
  },
  FETCH_PROPERTY({ state, commit }, { id }) {
    return lazy(
      (property) => {
        let items
        if (property.items) {
          items = property.items[0]
        } else {
          items = property
        }
        commit('SET_PROPERTY', { id, items })
      },
      () => this.$axios.$get(`/property/website/PropertyDetails/${id}`),
      Object.assign({ id, loading: true }, state.properties[id])
    )
  }
}

