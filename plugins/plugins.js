import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import VueLazyload from 'vue-lazyload'
import vSelect from 'vue-select'
import VueLightGallery from 'vue-light-gallery'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC2UCVx0nxchnk5D42-7BpOrdPAaF6l2eU',
    libraries: 'directions',
  }
})
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/images/no-photo.png',
  loading: '/images/loading.svg',
  attempt: 1
})
Vue.use(VueLightGallery)
Vue.component('v-select', vSelect)

