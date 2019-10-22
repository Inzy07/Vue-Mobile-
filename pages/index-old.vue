<template>
  <section>
    <!--Banner Section Starts-->
    <section>
      <div class="container-fluid banner-bg w-100 float-left px-0 position-relative">
        <img v-lazy="`images/header-images.jpg`" width="100%" />
        <div
          class="search-bg position-absolute d-flex flex-row justify-content-center align-items-center h-100"
        >
          <div class="row w-100">
            <div class="col-lg-12 text-center">
              <h1 class="text-white">Find your dream villa in Dubai</h1>
              <p
                class="text-white"
              >Villas are available for sale or rent in Dubai by renowned developers.</p>
            </div>
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
    <!--Banner Section Ends-->
    <!--Communities Section Starts-->
    <section>
      <div class="container-fluid communities-bg px-0 bg-white position-relative">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 py-5 text-center">
              <h1 class="text-dark">Dubai's Top Communities</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 pb-5">
            <!-- Swiper -->
            <div v-swiper:mySwiper="swiperOption" class="swiper-container py-5">
              <div class="swiper-wrapper">
                <div v-for="project in featuredProjects" :key="project.id" class="swiper-slide">
                  <img :src="`${config.imagePrefix}${project.image_url}`" width="100%" />
                  <div class="home-data">
                    <h2><a :to="'/buy-house-in-dubai/'+project.building_url">{{ project.building }}</a></h2>
                    <h4><span class="primary-text"><svg role="img" width="25px" height="25px">
                    <use xlink:href="~static/images/defs.svg#img-map-slider" />
                    </svg> {{ project.area }}</span>
                    </h4>
                    <h3 v-if="project.building_min_price">
                      Starting from
                      <span>
                        {{ project.building_min_price }}
                        <sup>AED</sup>
                      </span>
                    </h3>
                    <h3 v-else>
                      Price is on
                      <span>Request</span>
                    </h3>
                    <div class="text-center hover-content py-2">
                      <div slot="project_overview">{{ project.overview }}</div>
                      <router-link
                        exact
                        class="btn btn-primary"
                        :to="'/buy-house-in-dubai/'+project.building_url"
                        role="button"
                      >Read More</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination" />
              <!-- If we need navigation buttons -->
              <div class="swiper-button-prev">
                <svg role="img" width="25px" height="25px">
                  <use xlink:href="~static/images/defs.svg#img-left-arrow" />
                </svg>
              </div>
              <div class="swiper-button-next">
                <svg role="img" width="25px" height="25px">
                  <use xlink:href="~static/images/defs.svg#img-right-arrow" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Communities Section Ends-->
  </section>
</template>

<script>
import SearchForm from "~/components/SearchForm.vue";

import { feeds, config } from "~/common/api";
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      transition: "slide-right",
      config: config,
      swiperOption: {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 15,
        freeMode: true,
        centeredSlides: true,
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 15,
            swiperOption:{
            }
          }
        }
      }
    };
  },
  validate({ params, query, store }) {
    return true;
  },
  computed: {
    projectsData() {
      return this.$store.state.feeds["BuildingList"][
        "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
      ];
    },
    featuredProjects() {
      return this.projectsData
        .map(id => this.$store.state.items["BuildingList"][id])
        .filter(itm => itm.is_feature == "Y");
    },
    loading() {
      return this.featuredProjects.length === 0;
    }
  },
  fetch({
    store,
    params: {
      feed = "BuildingList",
      filters = "/ALL/ALL/" + config.websiteId + "/ALL/Villa/ALL"
    }
  }) {
    return store.dispatch("FETCH_FEED", { feed, filters });
  },
  head() {
    return {
      title: `Buy, Sell or Rent Villas & Houses in Dubai - Dubai Villas`,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: `Buy, Sell or Rent Villas & Houses in Dubai - Dubai Villas`
        },
        {
          hid: "og:description",
          name: "og:description",
          property: "og:description",
          content:`Villas are available for sale or rent in Dubai by renowned developers. Find out all the details including a payment plan, prices, floor plans. Contact us now.`
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          property: "og:site_name",
          content: "Luxury Villas Dubai"
        },
        {
          hid: "description",
          name: "description",
          content: `Villas are available for sale or rent in Dubai by renowned developers. Find out all the details including a payment plan, prices, floor plans. Contact us now.`
        }
      ]
    }
  },
  methods: {}
};
</script>
